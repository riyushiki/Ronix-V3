import {
  GAUSSIAN_EXP_FACTOR,
  ROOT_2LN2_MINUS_ONE,
  ROOT_PI_OVER_LN2,
} from '../util/constants';

import { Gaussian } from './Gaussian';
import { Lorentzian } from './Lorentzian';

export class PseudoVoigt {
  /**
   * @param {object} [options={}]
   * @param {number} [options.height=1/(mu*FWHM/sqrt(4*LN2/PI)+(1-mu)*fwhm*PI*0.5)] Define the height of the peak, by default area=1 (normalized)
   * @param {number} [options.fwhm=500] - Full Width at Half Maximum in the number of points in FWHM.
   * @param {number} [options.mu=0.5] - ratio of gaussian contribution.
   */

  constructor(options = {}) {
    this.mu = options.mu === undefined ? 0.5 : options.mu;
    this.fwhm = options.fwhm === undefined ? 500 : options.fwhm;
    this.height =
      options.height === undefined
        ? 1 /
          ((this.mu / Math.sqrt(-GAUSSIAN_EXP_FACTOR / Math.PI)) * this.fwhm +
            ((1 - this.mu) * this.fwhm * Math.PI) / 2)
        : options.height;
  }

  /**
   * Calculate a linear combination of gaussian and lorentzian function width an same full width at half maximum
   * @param { object } [options = {}]
   * @param { number } [options.factor = 2 * Math.tan(Math.PI * (0.9999 - 0.5))] - Number of time to take fwhm in the calculation of the length.Default covers 99.99 % of area.
   * @param { number } [options.length = fwhm * factor + 1] - total number of points to calculate
   * @return { object } - { fwhm, data<Float64Array>} - An with the number of points at half maximum and the array of y values covering the 99.99 % of the area.
   */

  getData(options = {}) {
    let { length, factor = this.getFactor() } = options;
    if (!length) {
      length = Math.ceil(this.fwhm * factor);
      if (length % 2 === 0) length++;
    }

    const center = (length - 1) / 2;

    let data = new Float64Array(length);
    for (let i = 0; i <= center; i++) {
      data[i] = this.fct(i - center) * this.height;
      data[length - 1 - i] = data[i];
    }

    return data;
  }

  /**
   * Return a parameterized function of a linear combination of Gaussian and Lorentzian shapes where the full width at half maximum are the same for both kind of shapes (see README for equation).
   * @param {number} [x] x value to calculate.
   * @returns {number} - the y value of a pseudo voigt with the current parameters.
   */

  fct(x) {
    return PseudoVoigt.fct(x, this.fwhm, this.mu);
  }

  /**
   * Calculate the number of times FWHM allows to reach a specific area coverage
   * @param {number} [area=0.9999] - required area to be coverage
   * @param {number} [mu=this.mu] - ratio of gaussian contribution.
   * @returns {number}
   */
  getFactor(area = 0.9999, mu = this.mu) {
    return PseudoVoigt.getFactor(area, mu);
  }

  /**
   * Calculate the area of the shape.
   * @returns {number} - returns the area.
   */
  getArea() {
    return PseudoVoigt.getArea(this.fwhm, { height: this.height, mu: this.mu });
  }

  /**
   * Compute the value of Full Width at Half Maximum (FMHM) from width between the inflection points.
   * @param {number} width - width between the inflection points
   * @param {number} [mu = 0.5] - ratio of gaussian contribution.
   * @returns {number} Full Width at Half Maximum (FMHM).
   */
  widthToFWHM(width, mu) {
    return PseudoVoigt.widthToFWHM(width, mu);
  }
  /**
   * Compute the value of width between the inflection points from Full Width at Half Maximum (FWHM).
   * @param {number} fwhm - Full Width at Half Maximum.
   * @param {number} [mu] - ratio of gaussian contribution.
   * @returns {number} width between the inflection points.
   */
  fwhmToWidth(fwhm = this.fwhm, mu = this.mu) {
    return PseudoVoigt.fwhmToWidth(fwhm, mu);
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

  /**
   * set a new mu
   * @param {number} mu - ratio of gaussian contribution.
   */
  setMu(mu) {
    this.mu = mu;
  }
}

/**
 * Return a parameterized function of a gaussian shape (see README for equation).
 * @param {number} x - x value to calculate.
 * @param {number} fwhm - full width half maximum
 * @param {number} [mu=0.5] - ratio of gaussian contribution.
 * @returns {number} - the y value of gaussian with the current parameters.
 */
PseudoVoigt.fct = function fct(x, fwhm, mu = 0.5) {
  return (1 - mu) * Lorentzian.fct(x, fwhm) + mu * Gaussian.fct(x, fwhm);
};

/**
 * Compute the value of Full Width at Half Maximum (FMHM) from width between the inflection points.
 * @param {number} width - width between the inflection points
 * @param {number} [mu = 0.5] - ratio of gaussian contribution.
 * @returns {number} Full Width at Half Maximum (FMHM).
 */
PseudoVoigt.widthToFWHM = function widthToFWHM(width, mu = 0.5) {
  return width * (mu * ROOT_2LN2_MINUS_ONE + 1);
};
/**
 * Compute the value of width between the inflection points from Full Width at Half Maximum (FWHM).
 * @param {number} fwhm - Full Width at Half Maximum.
 * @param {number} [mu = 0.5] - ratio of gaussian contribution.
 * @returns {number} width between the inflection points.
 */
PseudoVoigt.fwhmToWidth = function fwhmToWidth(fwhm, mu = 0.5) {
  return fwhm / (mu * ROOT_2LN2_MINUS_ONE + 1);
};

/**
 * Calculate the area of a specific shape.
 * @param {number} fwhm - Full width at half maximum.
 * @param {*} [options = {}] - options.
 * @param {number} [options.height = 1] - Maximum y value of the shape.
 * @param {number} [options.mu = 0.5] - ratio of gaussian contribution.
 * @returns {number} - returns the area of the specific shape and parameters.
 */
PseudoVoigt.getArea = function getArea(fwhm, options = {}) {
  let { height = 1, mu = 0.5 } = options;
  return (fwhm * height * (mu * ROOT_PI_OVER_LN2 + (1 - mu) * Math.PI)) / 2;
};

/**
 * Calculate the number of times FWHM allows to reach a specific area coverage
 * @param {number} [area=0.9999] - required area to be coverage
 * @param {number} [mu=this.mu] - ratio of gaussian contribution.
 * @returns {number}
 */
PseudoVoigt.getFactor = function getFactor(area = 0.9999, mu = 0.5) {
  return mu < 1 ? Lorentzian.getFactor(area) : Gaussian.getFactor(area);
};
