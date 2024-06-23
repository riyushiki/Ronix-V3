import Matrix from 'ml-matrix';

import * as Utils from './util/utils';

/**
 * @class PLS
 */
export class PLS {
  /**
   * Constructor for Partial Least Squares (PLS)
   * @param {object} options
   * @param {number} [options.latentVectors] - Number of latent vector to get (if the algorithm doesn't find a good model below the tolerance)
   * @param {number} [options.tolerance=1e-5]
   * @param {boolean} [options.scale=true] - rescale dataset using mean.
   * @param {object} model - for load purposes.
   */
  constructor(options, model) {
    if (options === true) {
      this.meanX = model.meanX;
      this.stdDevX = model.stdDevX;
      this.meanY = model.meanY;
      this.stdDevY = model.stdDevY;
      this.PBQ = Matrix.checkMatrix(model.PBQ);
      this.R2X = model.R2X;
      this.scale = model.scale;
      this.scaleMethod = model.scaleMethod;
      this.tolerance = model.tolerance;
    } else {
      let { tolerance = 1e-5, scale = true } = options;
      this.tolerance = tolerance;
      this.scale = scale;
      this.latentVectors = options.latentVectors;
    }
  }

  /**
   * Fits the model with the given data and predictions, in this function is calculated the
   * following outputs:
   *
   * T - Score matrix of X
   * P - Loading matrix of X
   * U - Score matrix of Y
   * Q - Loading matrix of Y
   * B - Matrix of regression coefficient
   * W - Weight matrix of X
   *
   * @param {Matrix|Array} trainingSet
   * @param {Matrix|Array} trainingValues
   */
  train(trainingSet, trainingValues) {
    trainingSet = Matrix.checkMatrix(trainingSet);
    trainingValues = Matrix.checkMatrix(trainingValues);

    if (trainingSet.length !== trainingValues.length) {
      throw new RangeError(
        'The number of X rows must be equal to the number of Y rows',
      );
    }

    this.meanX = trainingSet.mean('column');
    this.stdDevX = trainingSet.standardDeviation('column', {
      mean: this.meanX,
      unbiased: true,
    });
    this.meanY = trainingValues.mean('column');
    this.stdDevY = trainingValues.standardDeviation('column', {
      mean: this.meanY,
      unbiased: true,
    });

    if (this.scale) {
      trainingSet = trainingSet
        .clone()
        .subRowVector(this.meanX)
        .divRowVector(this.stdDevX);
      trainingValues = trainingValues
        .clone()
        .subRowVector(this.meanY)
        .divRowVector(this.stdDevY);
    }

    if (this.latentVectors === undefined) {
      this.latentVectors = Math.min(trainingSet.rows - 1, trainingSet.columns);
    }

    let rx = trainingSet.rows;
    let cx = trainingSet.columns;
    let ry = trainingValues.rows;
    let cy = trainingValues.columns;

    let ssqXcal = trainingSet
      .clone()
      .mul(trainingSet)
      .sum(); // for the r²
    let sumOfSquaresY = trainingValues
      .clone()
      .mul(trainingValues)
      .sum();

    let tolerance = this.tolerance;
    let n = this.latentVectors;
    let T = Matrix.zeros(rx, n);
    let P = Matrix.zeros(cx, n);
    let U = Matrix.zeros(ry, n);
    let Q = Matrix.zeros(cy, n);
    let B = Matrix.zeros(n, n);
    let W = P.clone();
    let k = 0;
    let t;
    let w;
    let q;
    let p;

    while (Utils.norm(trainingValues) > tolerance && k < n) {
      let transposeX = trainingSet.transpose();
      let transposeY = trainingValues.transpose();

      let tIndex = maxSumColIndex(trainingSet.clone().mul(trainingSet));
      let uIndex = maxSumColIndex(trainingValues.clone().mul(trainingValues));

      let t1 = trainingSet.getColumnVector(tIndex);
      let u = trainingValues.getColumnVector(uIndex);
      t = Matrix.zeros(rx, 1);

      while (Utils.norm(t1.clone().sub(t)) > tolerance) {
        w = transposeX.mmul(u);
        w.div(Utils.norm(w));
        t = t1;
        t1 = trainingSet.mmul(w);
        q = transposeY.mmul(t1);
        q.div(Utils.norm(q));
        u = trainingValues.mmul(q);
      }

      t = t1;
      let num = transposeX.mmul(t);
      let den = t
        .transpose()
        .mmul(t)
        .get(0, 0);
      p = num.div(den);
      let pnorm = Utils.norm(p);
      p.div(pnorm);
      t.mul(pnorm);
      w.mul(pnorm);

      num = u.transpose().mmul(t);
      den = t
        .transpose()
        .mmul(t)
        .get(0, 0);
      let b = num.div(den).get(0, 0);
      trainingSet.sub(t.mmul(p.transpose()));
      trainingValues.sub(
        t
          .clone()
          .mul(b)
          .mmul(q.transpose()),
      );

      T.setColumn(k, t);
      P.setColumn(k, p);
      U.setColumn(k, u);
      Q.setColumn(k, q);
      W.setColumn(k, w);

      B.set(k, k, b);
      k++;
    }

    k--;
    T = T.subMatrix(0, T.rows - 1, 0, k);
    P = P.subMatrix(0, P.rows - 1, 0, k);
    U = U.subMatrix(0, U.rows - 1, 0, k);
    Q = Q.subMatrix(0, Q.rows - 1, 0, k);
    W = W.subMatrix(0, W.rows - 1, 0, k);
    B = B.subMatrix(0, k, 0, k);

    this.ssqYcal = sumOfSquaresY;
    this.E = trainingSet;
    this.F = trainingValues;
    this.T = T;
    this.P = P;
    this.U = U;
    this.Q = Q;
    this.W = W;
    this.B = B;
    this.PBQ = P.mmul(B).mmul(Q.transpose());
    this.R2X = t
      .transpose()
      .mmul(t)
      .mmul(p.transpose().mmul(p))
      .div(ssqXcal)
      .get(0, 0);
  }

  /**
   * Predicts the behavior of the given dataset.
   * @param {Matrix|Array} dataset - data to be predicted.
   * @return {Matrix} - predictions of each element of the dataset.
   */
  predict(dataset) {
    let X = Matrix.checkMatrix(dataset);
    if (this.scale) {
      X = X.subRowVector(this.meanX).divRowVector(this.stdDevX);
    }
    let Y = X.mmul(this.PBQ);
    Y = Y.mulRowVector(this.stdDevY).addRowVector(this.meanY);
    return Y;
  }

  /**
   * Returns the explained variance on training of the PLS model
   * @return {number}
   */
  getExplainedVariance() {
    return this.R2X;
  }

  /**
   * Export the current model to JSON.
   * @return {object} - Current model.
   */
  toJSON() {
    return {
      name: 'PLS',
      R2X: this.R2X,
      meanX: this.meanX,
      stdDevX: this.stdDevX,
      meanY: this.meanY,
      stdDevY: this.stdDevY,
      PBQ: this.PBQ,
      tolerance: this.tolerance,
      scale: this.scale,
    };
  }

  /**
   * Load a PLS model from a JSON Object
   * @param {object} model
   * @return {PLS} - PLS object from the given model
   */
  static load(model) {
    if (model.name !== 'PLS') {
      throw new RangeError(`Invalid model: ${model.name}`);
    }
    return new PLS(true, model);
  }
}

/**
 * @private
 * Function that returns the index where the sum of each
 * column vector is maximum.
 * @param {Matrix} data
 * @return {number} index of the maximum
 */
function maxSumColIndex(data) {
  return Matrix.rowVector(data.sum('column')).maxIndex()[0];
}
