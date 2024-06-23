import {
  ROOT_2LN2,
  GAUSSIAN_EXP_FACTOR,
  ROOT_PI_OVER_LN2,
} from '../util/constants';
import erfinv from '../util/erfinv';

export class Gaussian {
  /**
   * @param {object} [options = {}]
   * @param {number} [options.height=4*LN2/(PI*FWHM)] Define the height of the peak, by default area=1 (normalized)
   * @param {number} [options.fwhm = 500] - Full Width at Half Maximum in the number of points in FWHM.
   * @param {number} [options.sd] - Standard deviation, if it's defined options.fwhm will be ignored and the value will be computed sd * Math.sqrt(8 * Math.LN2);
   */
  constructor(options = {}) {
    this.fwhm = options.sd
      ? Gaussian.widthToFWHM(2 * options.sd)
      : options.fwhm
      ? options.fwhm
      : 500;
    this.height =
      options.height === undefined
        ? Math.sqrt(-GAUSSIAN_EXP_FACTOR / Math.PI) / this.fwhm
        : options.height;
  }
  /**
   * Calculate a gaussian shape
   * @param {object} [options = {}]
   * @param {number} [options.factor = 6] - Number of time to take fwhm to calculate length. Default covers 99.99 % of area.
   * @param {number} [options.length = fwhm * factor + 1] - total number of points to calculate
   * @return {Float64Array} y values
   */

  getData(options = {}) {
    let { length, factor = this.getFactor() } = options;

    if (!length) {
      length = Math.min(Math.ceil(this.fwhm * factor), Math.pow(2, 25) - 1);
      if (length % 2 === 0) length++;
    }

    const center = (length - 1) / 2;
    const data = new Float64Array(length);
    for (let i = 0; i <= center; i++) {
      data[i] = this.fct(i - center) * this.height;
      data[length - 1 - i] = data[i];
    }

    return data;
  }

  /**
   * Return a parameterized function of a gaussian shape (see README for equation).
   * @param {number} x - x value to calculate.
   * @returns {number} - the y value of gaussian with the current parameters.
   */
  fct(x) {
    return Gaussian.fct(x, this.fwhm);
  }

  /**
   * Calculate the number of times FWHM allows to reach a specific area coverage
   * @param {number} [area=0.9999]
   * @returns {number}
   */
  getFactor(area = 0.9999) {
    return Gaussian.getFactor(area);
  }

  /**
   * Calculate the area of the shape.
   * @returns {number} - returns the area.
   */

  getArea() {
    return Gaussian.getArea(this.fwhm, { height: this.height });
  }

  /**
   * Compute the value of Full Width at Half Maximum (FWHM) from the width between the inflection points.
   * //https://mathworld.wolfram.com/GaussianFunction.html
   * @param {number} width - Width between the inflection points
   * @returns {number} fwhm
   */
  widthToFWHM(width) {
    //https://mathworld.wolfram.com/GaussianFunction.html
    return Gaussian.widthToFWHM(width);
  }

  /**
   * Compute the value of width between the inflection points from Full Width at Half Maximum (FWHM).
   * //https://mathworld.wolfram.com/GaussianFunction.html
   * @param {number} fwhm - Full Width at Half Maximum.
   * @returns {number} width
   */
  fwhmToWidth(fwhm = this.fwhm) {
    return Gaussian.fwhmToWidth(fwhm);
  }

  /**
   * set a new full width at half maximum
   * @param {number} fwhm - full width at half maximum
   */
  setFWHM(fwhm) {
    this.fwhm = fwhm;
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
 * Return a parameterized function of a gaussian shape (see README for equation).
 * @param {number} x - x value to calculate.
 * @param {number} fwhm - full width half maximum
 * @returns {number} - the y value of gaussian with the current parameters.
 */
Gaussian.fct = function fct(x, fwhm = 500) {
  return Math.exp(GAUSSIAN_EXP_FACTOR * Math.pow(x / fwhm, 2));
};

/**
 * Compute the value of Full Width at Half Maximum (FWHM) from the width between the inflection points.
 * //https://mathworld.wolfram.com/GaussianFunction.html
 * @param {number} width - Width between the inflection points
 * @returns {number} fwhm
 */
Gaussian.widthToFWHM = function widthToFWHM(width) {
  return width * ROOT_2LN2;
};

/**
 * Compute the value of width between the inflection points from Full Width at Half Maximum (FWHM).
 * //https://mathworld.wolfram.com/GaussianFunction.html
 * @param {number} fwhm - Full Width at Half Maximum.
 * @returns {number} width
 */
Gaussian.fwhmToWidth = function fwhmToWidth(fwhm) {
  return fwhm / ROOT_2LN2;
};

/**
 * Calculate the area of a specific shape.
 * @param {number} fwhm - Full width at half maximum.
 * @param {object} [options = {}] - options.
 * @param {number} [options.height = 1] - Maximum y value of the shape.
 * @returns {number} - returns the area of the specific shape and parameters.
 */

Gaussian.getArea = function getArea(fwhm, options = {}) {
  let { height = 1 } = options;
  return (height * ROOT_PI_OVER_LN2 * fwhm) / 2;
};

/**
 * Calculate the number of times FWHM allows to reach a specific area coverage.
 * @param {number} [area=0.9999]
 * @returns {number}
 */
Gaussian.getFactor = function getFactor(area = 0.9999) {
  return Math.sqrt(2) * erfinv(area);
};
