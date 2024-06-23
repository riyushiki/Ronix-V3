import {
  ROOT_2LN2,
  GAUSSIAN_EXP_FACTOR,
  ROOT_PI_OVER_LN2,
} from '../../../util/constants';
import erfinv from '../../../util/erfinv';
import { Shape1D } from '../Shape1D';

export interface GaussianClassOptions {
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
   * The halft width between the inflection points or standard deviation.
   * If it is defined the fwhm would be re-assigned.
   */
  sd?: number;
}

export interface GetDataOptions extends GaussianClassOptions {
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
   * The halft width between the inflection points or standard deviation.
   * If it is defined the fwhm would be re-assigned.
   */
  sd?: number;
}

export class Gaussian extends Shape1D {
  /**
   * The maximum value of the shape
   */
  public height: number;
  /**
   * Full width at half maximum.
   * @default 500
   */
  public fwhm: number;

  public constructor(options: GaussianClassOptions = {}) {
    super();
    const { fwhm = 500, sd, height } = options;

    this.fwhm = sd ? widthToFWHM(2 * sd) : fwhm;
    this.height =
      height === undefined
        ? Math.sqrt(-GAUSSIAN_EXP_FACTOR / Math.PI) / this.fwhm
        : height;
  }

  public fwhmToWidth(fwhm = this.fwhm) {
    return fwhmToWidth(fwhm);
  }

  public widthToFWHM(width: number) {
    return widthToFWHM(width);
  }

  public fct(x: number) {
    return fct(x, this.fwhm);
  }

  public getArea() {
    return getArea({ fwhm: this.fwhm, height: this.height });
  }

  public getFactor(area?: number) {
    return getFactor(area);
  }

  public getData(options: GetDataOptions = {}) {
    const { length, factor } = options;
    return getData({ fwhm: this.fwhm, height: this.height, factor, length });
  }
}
/**
 * Return a parameterized function of a gaussian shape (see README for equation).
 * @returns - the y value of gaussian with the current parameters.
 */
export function fct(x: number, fwhm: number) {
  return Math.exp(GAUSSIAN_EXP_FACTOR * Math.pow(x / fwhm, 2));
}

/**
 * Compute the value of Full Width at Half Maximum (FWHM) from the width between the inflection points.
 * for more information check the [mathworld page](https://mathworld.wolfram.com/GaussianFunction.html)
 * @returns fwhm
 */
export function widthToFWHM(width: number) {
  return width * ROOT_2LN2;
}

/**
 * Compute the value of width between the inflection points from Full Width at Half Maximum (FWHM).
 * for more information check the [mathworld page](https://mathworld.wolfram.com/GaussianFunction.html)
 * @param fwhm - Full Width at Half Maximum.
 * @returns width
 */
export function fwhmToWidth(fwhm: number) {
  return fwhm / ROOT_2LN2;
}

/**
 * Calculate the area of a specific shape.
 * @returns returns the area of the specific shape and parameters.
 */

export function getArea(options: GetAreaOptions) {
  let { fwhm, sd, height = 1 } = options;

  if (sd) fwhm = widthToFWHM(2 * sd);

  if (fwhm === undefined) {
    throw new Error('should pass fwhm or sd parameters');
  }

  return (height * ROOT_PI_OVER_LN2 * fwhm) / 2;
}

/**
 * Calculate the number of times FWHM allows to reach a specific area coverage.
 * @param [area=0.9999] Expected area to be covered.
 * @returns
 */
export function getFactor(area = 0.9999) {
  return Math.sqrt(2) * erfinv(area);
}

/**
 * Calculate intensity array of a gaussian shape.
 * @returns {Float64Array} Intensity values.
 */

export function getData(options: GetDataOptions = {}) {
  let { length, factor = getFactor(), fwhm = 500, sd, height } = options;
  if (sd) fwhm = widthToFWHM(2 * sd);

  if (!height) {
    height = Math.sqrt(-GAUSSIAN_EXP_FACTOR / Math.PI) / fwhm;
  }

  if (!length) {
    length = Math.min(Math.ceil(fwhm * factor), Math.pow(2, 25) - 1);
    if (length % 2 === 0) length++;
  }

  const center = (length - 1) / 2;
  const data = new Float64Array(length);
  for (let i = 0; i <= center; i++) {
    data[i] = fct(i - center, fwhm) * height;
    data[length - 1 - i] = data[i];
  }

  return data;
}
