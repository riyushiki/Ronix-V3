import Matrix from 'ml-matrix';

/**
 * @private
 * Function that given vector, returns its norm
 * @param {Vector} X
 * @return {number} Norm of the vector
 */
export function norm(X) {
  return Math.sqrt(
    X.clone()
      .apply(pow2array)
      .sum(),
  );
}

/**
 * @private
 * Function that pow 2 each element of a Matrix or a Vector,
 * used in the apply method of the Matrix object
 * @param {number} i - index i.
 * @param {number} j - index j.
 * @return {Matrix} The Matrix object modified at the index i, j.
 * */
export function pow2array(i, j) {
  this.set(i, j, this.get(i, j) ** 2);
}

/**
 * @private
 * Function that normalize the dataset and return the means and
 * standard deviation of each feature.
 * @param {Matrix} dataset
 * @return {object} dataset normalized, means and standard deviations
 */
export function featureNormalize(dataset) {
  let means = dataset.mean('column');
  let std = dataset.standardDeviation('column', {
    mean: means,
    unbiased: true,
  });
  let result = Matrix.checkMatrix(dataset).subRowVector(means);
  return { result: result.divRowVector(std), means: means, std: std };
}

/**
 * @private
 * Function that initialize an array of matrices.
 * @param {Array} array
 * @param {boolean} isMatrix
 * @return {Array} array with the matrices initialized.
 */
export function initializeMatrices(array, isMatrix) {
  if (isMatrix) {
    for (let i = 0; i < array.length; ++i) {
      for (let j = 0; j < array[i].length; ++j) {
        let elem = array[i][j];
        array[i][j] = elem !== null ? new Matrix(array[i][j]) : undefined;
      }
    }
  } else {
    for (let i = 0; i < array.length; ++i) {
      array[i] = new Matrix(array[i]);
    }
  }

  return array;
}
