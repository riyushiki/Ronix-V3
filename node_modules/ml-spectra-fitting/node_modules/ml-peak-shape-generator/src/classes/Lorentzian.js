import { ROOT_THREE } from '../util/constants';

export class Lorentzian {
  /**
   * @param {object} [options = {}]
   * @param {number} [options.height=2/(PI*FWHM)] Define the height of the peak, by default area=1 (normalized)
   * @param {number} [options.fwhm = 500] - Full Width at Half Maximum in the number of points in FWHM.
   * @param {number} [options.sd] - Standard deviation, if it's defined options.fwhm will be ignored and the value will be computed sd * Math.sqrt(8 * Math.LN2);
   */
  constructor(options = {}) {
    this.fwhm = options.fwhm === undefined ? 500 : options.fwhm;
    this.height =
      options.height === undefined ? 2 / Math.PI / this.fwhm : options.height;
  }
  /**
   * Calculate a lorentzian shape
   * @param {object} [options = {}]
   * @param {number} [options.factor = Math.tan(Math.PI * (0.9999 - 0.5))] - Number of time to take fwhm to calculate length. Default covers 99.99 % of area.
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
   * Return a parameterized function of a lorentzian shape (see README for equation).
   * @param {number} x - x value to calculate.
   * @returns {number} - the y value of lorentzian with the current parameters.
   */
  fct(x) {
    return Lorentzian.fct(x, this.fwhm);
  }

  /**
   * Calculate the number of times FWHM allows to reach a specific area coverage
   * @param {number} [area=0.9999]
   * @returns {number}
   */
  getFactor(area = 0.9999) {
    return Lorentzian.getFactor(area);
  }

  /**
   * Calculate the area of the shape.
   * @returns {number} - returns the area.
   */

  getArea() {
    return Lorentzian.getArea(this.fwhm, { height: this.height });
  }

  /**
   * Compute the value of width between the inflection points of a specific shape from Full Width at Half Maximum (FWHM).
   * //https://mathworld.wolfram.com/LorentzianFunction.html
   * @param {number} [fwhm] - Full Width at Half Maximum.
   * @returns {number} width between the inflection points
   */
  fwhmToWidth(fwhm = this.fwhm) {
    return Lorentzian.fwhmToWidth(fwhm);
  }

  /**
   * Compute the value of Full Width at Half Maximum (FWHM) of a specific shape from the width between the inflection points.
   * //https://mathworld.wolfram.com/LorentzianFunction.html
   * @param {number} [width] Width between the inflection points
   * @returns {number} fwhm
   */
  widthToFWHM(width) {
    return Lorentzian.widthToFWHM(width);
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
Lorentzian.fct = function fct(x, fwhm) {
  const squareFWHM = fwhm * fwhm;
  return squareFWHM / (4 * Math.pow(x, 2) + squareFWHM);
};

/**
 * Compute the value of width between the inflection points of a specific shape from Full Width at Half Maximum (FWHM).
 * //https://mathworld.wolfram.com/LorentzianFunction.html
 * @param {number} [fwhm] - Full Width at Half Maximum.
 * @returns {number} width between the inflection points
 */
Lorentzian.fwhmToWidth = function fwhmToWidth(fwhm) {
  return fwhm / ROOT_THREE;
};

/**
 * Compute the value of Full Width at Half Maximum (FWHM) of a specific shape from the width between the inflection points.
 * //https://mathworld.wolfram.com/LorentzianFunction.html
 * @param {number} [width] Width between the inflection points
 * @returns {number} fwhm
 */
Lorentzian.widthToFWHM = function widthToFWHM(width) {
  return width * ROOT_THREE;
};

/**
 * Calculate the area of a specific shape.
 * @param {number} fwhm - Full width at half maximum.
 * @param {*} [options = {}] - options.
 * @param {number} [options.height = 1] - Maximum y value of the shape.
 * @returns {number} - returns the area of the specific shape and parameters.
 */
Lorentzian.getArea = function getArea(fwhm, options = {}) {
  let { height = 1 } = options;

  return (height * Math.PI * fwhm) / 2;
};

/**
 * Calculate the number of times FWHM allows to reach a specific area coverage
 * @param {number} [area=0.9999]
 * @returns {number}
 */
Lorentzian.getFactor = function getFactor(area = 0.9999) {
  return 2 * Math.tan(Math.PI * (area - 0.5));
};
