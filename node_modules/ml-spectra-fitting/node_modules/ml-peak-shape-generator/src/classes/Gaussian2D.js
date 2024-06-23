import { ROOT_2LN2, GAUSSIAN_EXP_FACTOR } from '../util/constants';
import erfinv from '../util/erfinv';

let axis = ['x', 'y'];

export class Gaussian2D {
  /**
   * @param {object} [options = {}]
   * @param {number} [options.height=4*LN2/(PI*xFWHM*yFWHM)] Define the height of the peak, by default area=1 (normalized).
   * @param {number} [options.fwhm = 500] - Full Width at Half Maximum in the number of points in FWHM used if x or y has not the fwhm property.
   * @param {object} [options.x] - Options for x axis.
   * @param {number} [options.x.fwhm = fwhm] - Full Width at Half Maximum in the number of points in FWHM for x axis.
   * @param {number} [options.x.sd] - Standard deviation for x axis, if it's defined options.x.fwhm will be ignored and the value will be computed sd * Math.sqrt(8 * Math.LN2);
   * @param {object} [options.y] - Options for y axis.
   * @param {number} [options.y.fwhm = fwhm] - Full Width at Half Maximum in the number of points in FWHM for y axis.
   * @param {number} [options.y.sd] - Standard deviation for y axis, if it's defined options.y.fwhm will be ignored and the value will be computed sd * Math.sqrt(8 * Math.LN2);
   */
  constructor(options = {}) {
    let { fwhm: globalFWHM = 500 } = options;

    for (let i of axis) {
      let fwhm;
      if (!options[i]) {
        fwhm = globalFWHM;
      } else {
        fwhm = options[i].sd
          ? Gaussian2D.widthToFWHM(2 * options[i].sd)
          : options[i].fwhm || globalFWHM;
      }
      this[i] = { fwhm };
    }

    this.height =
      options.height === undefined
        ? -GAUSSIAN_EXP_FACTOR / Math.PI / this.x.fwhm / this.y.fwhm
        : options.height;
  }
  /**
   * Calculate a Gaussian2D shape
   * @param {object} [options = {}]
   * @param {number} [options.factor] - Number of time to take fwhm to calculate length. Default covers 99.99 % of area.
   * @param {object} [options.x] - parameter for x axis.
   * @param {number} [options.x.length=fwhm*factor+1] - length on x axis.
   * @param {number} [options.x.factor=factor] - Number of time to take fwhm to calculate length. Default covers 99.99 % of area.
   * @param {object} [options.y] - parameter for y axis.
   * @param {number} [options.y.length=fwhm*factor+1] - length on y axis.
   * @param {number} [options.y.factor=factor] - Number of time to take fwhm to calculate length. Default covers 99.99 % of area.
   * @return {Array<Float64Array>} - z values.
   */

  getData(options = {}) {
    let { x = {}, y = {}, factor = this.getFactor(), length } = options;

    let xLength = x.length || length;
    if (!xLength) {
      let { factor: xFactor = factor } = x;
      xLength = Math.min(Math.ceil(this.x.fwhm * xFactor), Math.pow(2, 25) - 1);
      if (xLength % 2 === 0) xLength++;
    }

    let yLength = y.length || length;
    if (!yLength) {
      let { factor: yFactor = factor } = y;
      yLength = Math.min(Math.ceil(this.y.fwhm * yFactor), Math.pow(2, 25) - 1);
      if (yLength % 2 === 0) yLength++;
    }

    const xCenter = (xLength - 1) / 2;
    const yCenter = (yLength - 1) / 2;
    const data = new Array(xLength);
    for (let i = 0; i < xLength; i++) {
      data[i] = new Array(yLength);
    }

    for (let i = 0; i < xLength; i++) {
      for (let j = 0; j < yLength; j++) {
        data[i][j] = this.fct(i - xCenter, j - yCenter) * this.height;
      }
    }

    return data;
  }

  /**
   * Return the intensity value of a 2D gaussian shape (see README for equation).
   * @param {number} x - x value to calculate.
   * @param {number} y - y value to calculate.
   * @returns {number} - the z value of bi-dimensional gaussian with the current parameters.
   */
  fct(x, y) {
    return Gaussian2D.fct(x, y, this.x.fwhm, this.y.fwhm);
  }

  /**
   * Calculate the number of times FWHM allows to reach a specific volume coverage.
   * @param {number} [volume=0.9999]
   * @returns {number}
   */
  getFactor(volume = 0.9999) {
    return Gaussian2D.getFactor(volume);
  }

  /**
   * Calculate the volume of the shape.
   * @returns {number} - returns the volume.
   */

  getVolume() {
    return Gaussian2D.getVolume(this.x.fwhm, this.y.fwhm, {
      height: this.height,
    });
  }

  /**
   * Compute the value of Full Width at Half Maximum (FWHM) from the width between the inflection points.
   * //https://mathworld.wolfram.com/Gaussian2DFunction.html
   * @param {number} width - Width between the inflection points
   * @returns {number} fwhm
   */
  widthToFWHM(width) {
    //https://mathworld.wolfram.com/Gaussian2DFunction.html
    return Gaussian2D.widthToFWHM(width);
  }

  /**
   * Compute the value of width between the inflection points from Full Width at Half Maximum (FWHM).
   * //https://mathworld.wolfram.com/Gaussian2DFunction.html
   * @param {number} fwhm - Full Width at Half Maximum.
   * @returns {number} width
   */
  fwhmToWidth(fwhm = this.x.fwhm) {
    return Gaussian2D.fwhmToWidth(fwhm);
  }

  /**
   * set a new full width at half maximum
   * @param {number} fwhm - full width at half maximum
   * @param {string|Array<string>} axisLabel - label of axis, if it is undefined fwhm is set to both axis.
   */
  setFWHM(fwhm, axisLabel) {
    if (!axisLabel) axisLabel = axis;
    if (!Array.isArray(axisLabel)) axisLabel = [axisLabel];
    for (let i of axisLabel) {
      let axisName = i.toLowerCase();
      if (axisName !== 'y' && axisName !== 'x') {
        throw new Error('axis label should be x or y');
      }
      this[axisName].fwhm = fwhm;
    }
  }

  /**
   * set a new height
   * @param {number} height - The maximal intensity of the shape.
   */
  setHeight(height) {
    this.height = height;
  }
}

/**
 * Return a parameterized function of a Gaussian2D shape (see README for equation).
 * @param {number} x - x value to calculate.
 * @param {number} y - y value to calculate.
 * @param {number} fwhmX - full width half maximum in the x axis.
 * @param {number} fwhmY - full width half maximum in the y axis.
 * @returns {number} - the z value of bi-dimensional gaussian with the current parameters.
 */
Gaussian2D.fct = function fct(x, y, xFWHM = 500, yFWHM = 500) {
  return Math.exp(
    GAUSSIAN_EXP_FACTOR * (Math.pow(x / xFWHM, 2) + Math.pow(y / yFWHM, 2)),
  );
};

/**
 * Compute the value of Full Width at Half Maximum (FWHM) from the width between the inflection points.
 * //https://mathworld.wolfram.com/Gaussian2DFunction.html
 * @param {number} width - Width between the inflection points
 * @returns {number} fwhm
 */
Gaussian2D.widthToFWHM = function widthToFWHM(width) {
  return width * ROOT_2LN2;
};

/**
 * Compute the value of width between the inflection points from Full Width at Half Maximum (FWHM).
 * //https://mathworld.wolfram.com/Gaussian2DFunction.html
 * @param {number} fwhm - Full Width at Half Maximum.
 * @returns {number} width
 */
Gaussian2D.fwhmToWidth = function fwhmToWidth(fwhm) {
  return fwhm / ROOT_2LN2;
};

/**
 * Calculate the volume of a specific shape.
 * @param {number} xFWHM - Full width at half maximum for x axis.
 * @param {number} yFWHM - Full width at half maximum for y axis.
 * @param {object} [options = {}] - options.
 * @param {number} [options.height = 1] - Maximum z value of the shape.
 * @returns {number} - returns the area of the specific shape and parameters.
 */

Gaussian2D.getVolume = function getVolume(xFWHM, yFWHM, options = {}) {
  let { height = 1 } = options;
  return (height * Math.PI * xFWHM * yFWHM) / Math.LN2 / 4;
};

/**@TODO look for a better factor
 * Calculate the number of times FWHM allows to reach a specific volume coverage.
 * @param {number} [volume=0.9999]
 * @returns {number}
 */
Gaussian2D.getFactor = function getFactor(volume = 0.9999) {
  return Math.sqrt(2) * erfinv(volume);
};
