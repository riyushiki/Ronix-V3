import {
  GAUSSIAN_EXP_FACTOR,
  ROOT_2LN2_MINUS_ONE,
  ROOT_PI_OVER_LN2,
} from '../../../util/constants';
import { Shape1D } from '../Shape1D';
import {
  fct as gaussian,
  getFactor as getFactorGaussian,
} from '../gaussian/Gaussian';
import {
  fct as lorentzian,
  getFactor as getFactorLorentzian,
} from '../lorentzian/Lorentzian';

export interface PseudoVoigtClassOptions {
  /**
   * The maximum value of the shape
   */
  height?: number;
  /**
   * Full width at half maximum.
   * @default 500
   */
  fwhm?: number;
  /**
   * Ratio of gaussian contribution in the shape
   * @default 0.5
   */
  mu?: number;
}

export interface GetDataOptions extends PseudoVoigtClassOptions {
  /**
   * number of points of the shape.
   * @default 'fwhm * factor'
   */
  length?: number;
  /**
   * Number of times of fwhm to calculate length..
   * @default 'covers 99.99 % of volume'
   */
  factor?: number;
}

export interface GetAreaOptions {
  /**
   * The maximum intensity value of the shape
   * @default 1
   */
  height?: number;
  /**
   * Full width at half maximum.
   * @default 500
   */
  fwhm?: number;
  /**
   * Ratio of gaussian contribution in the shape
   * @default 0.5
   */
  mu?: number;
}

export class PseudoVoigt extends Shape1D {
  /**
   * The maximum value of the shape
   */
  public height: number;
  /**
   * Full width at half maximum.
   * @default 500
   */
  public fwhm: number;
  /**
   * Ratio of gaussian contribution in the shape
   * @default 0.5
   */
  public mu: number;

  public constructor(options: PseudoVoigtClassOptions = {}) {
    super();
    const { fwhm = 500, height, mu = 0.5 } = options;

    this.mu = mu;
    this.fwhm = fwhm;
    this.height =
      height === undefined
        ? 1 /
          ((mu / Math.sqrt(-GAUSSIAN_EXP_FACTOR / Math.PI)) * fwhm +
            ((1 - mu) * fwhm * Math.PI) / 2)
        : height;
  }

  public fwhmToWidth(fwhm = this.fwhm, mu = this.mu) {
    return fwhmToWidth(fwhm, mu);
  }

  public widthToFWHM(width: number, mu: number = this.mu) {
    return widthToFWHM(width, mu);
  }

  public fct(x: number) {
    return fct(x, this.fwhm, this.mu);
  }

  public getArea() {
    return getArea({ fwhm: this.fwhm, height: this.height, mu: this.mu });
  }

  public getFactor(area?: number) {
    return getFactor(area);
  }

  public getData(options: GetDataOptions = {}) {
    const { length, factor } = options;
    return getData({
      fwhm: this.fwhm,
      height: this.height,
      mu: this.mu,
      factor,
      length,
    });
  }
}

/**
 * Return a parameterized function of a pseudo voigt shape (see README for equation).
 * @param x - x value to calculate.
 * @param fwhm - full width half maximum
 * @returns - the y value of pseudo voigt with the current parameters.
 */
export function fct(x: number, fwhm: number, mu: number) {
  return (1 - mu) * lorentzian(x, fwhm) + mu * gaussian(x, fwhm);
}

/**
 * Compute the value of Full Width at Half Maximum (FWHM) from the width between the inflection points.
 * @param width - Width between the inflection points
 * @param [mu=0.5] Ratio of gaussian contribution in the shape
 * @returns fwhm
 */
export function widthToFWHM(width: number, mu = 0.5) {
  return width * (mu * ROOT_2LN2_MINUS_ONE + 1);
}

/**
 * Compute the value of width between the inflection points from Full Width at Half Maximum (FWHM).
 * @param fwhm - Full Width at Half Maximum.
 * @param [mu=0.5] Ratio of gaussian contribution in the shape
 * @returns width
 */
export function fwhmToWidth(fwhm: number, mu = 0.5) {
  return fwhm / (mu * ROOT_2LN2_MINUS_ONE + 1);
}

/**
 * Calculate the area of a specific shape.
 * @returns returns the area of the specific shape and parameters.
 */

export function getArea(options: GetAreaOptions) {
  const { fwhm, height = 1, mu = 0.5 } = options;
  if (fwhm === undefined) {
    throw new Error('should pass fwhm or sd parameters');
  }

  return (fwhm * height * (mu * ROOT_PI_OVER_LN2 + (1 - mu) * Math.PI)) / 2;
}

/**
 * Calculate the number of times FWHM allows to reach a specific area coverage.
 * @param [area=0.9999] Expected area to be covered.
 * @returns
 */
export function getFactor(area = 0.9999, mu = 0.5) {
  return mu < 1 ? getFactorLorentzian(area) : getFactorGaussian(area);
}

/**
 * Calculate intensity array of a pseudo voigt shape.
 * @returns {Float64Array} y values
 */

export function getData(options: GetDataOptions = {}) {
  let { length, factor = getFactor(), fwhm = 500, height, mu = 0.5 } = options;

  if (!height) {
    height =
      1 /
      ((mu / Math.sqrt(-GAUSSIAN_EXP_FACTOR / Math.PI)) * fwhm +
        ((1 - mu) * fwhm * Math.PI) / 2);
  }

  if (!length) {
    length = Math.min(Math.ceil(fwhm * factor), Math.pow(2, 25) - 1);
    if (length % 2 === 0) length++;
  }

  const center = (length - 1) / 2;
  const data = new Float64Array(length);
  for (let i = 0; i <= center; i++) {
    data[i] = fct(i - center, fwhm, mu) * height;
    data[length - 1 - i] = data[i];
  }

  return data;
}
