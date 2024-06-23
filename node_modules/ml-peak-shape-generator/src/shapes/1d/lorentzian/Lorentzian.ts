import { ROOT_THREE } from '../../../util/constants';
import { Shape1D } from '../Shape1D';

export interface LorentzianClassOptions {
  /**
   * The maximum value of the shape
   */
  height?: number;
  /**
   * Full width at half maximum.
   * @default 500
   */
  fwhm?: number;
}

export interface GetDataOptions extends LorentzianClassOptions {
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
}

export class Lorentzian extends Shape1D {
  /**
   * The maximum value of the shape
   */
  public height: number;
  /**
   * Full width at half maximum.
   * @default 500
   */
  public fwhm: number;

  public constructor(options: LorentzianClassOptions = {}) {
    super();
    const { fwhm = 500, height } = options;

    this.fwhm = fwhm;
    this.height = height === undefined ? 2 / Math.PI / fwhm : height;
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
 * Return a parameterized function of a lorentzian shape (see README for equation).
 * @param x - x value to calculate.
 * @param fwhm - full width half maximum
 * @returns - the y value of lorentzian with the current parameters.
 */
export function fct(x: number, fwhm: number) {
  return Math.pow(fwhm, 2) / (4 * Math.pow(x, 2) + Math.pow(fwhm, 2));
}

/**
 * Compute the value of Full Width at Half Maximum (FWHM) from the width between the inflection points.
 * for more information check the [mathworld page](https://mathworld.wolfram.com/LorentzianFunction.html)
 * @param width - Width between the inflection points
 * @returns fwhm
 */
export function widthToFWHM(width: number) {
  return width * ROOT_THREE;
}

/**
 * Compute the value of width between the inflection points from Full Width at Half Maximum (FWHM).
 * for more information check the [mathworld page](https://mathworld.wolfram.com/LorentzianFunction.html)
 * @param fwhm - Full Width at Half Maximum.
 * @returns width
 */
export function fwhmToWidth(fwhm: number) {
  return fwhm / ROOT_THREE;
}

/**
 * Calculate the area of a specific shape.
 * @returns returns the area of the specific shape and parameters.
 */

export function getArea(options: GetAreaOptions) {
  const { fwhm, height = 1 } = options;

  if (fwhm === undefined) {
    throw new Error('should pass fwhm or sd parameters');
  }

  return (height * Math.PI * fwhm) / 2;
}

/**
 * Calculate the number of times FWHM allows to reach a specific area coverage.
 * @param [area=0.9999] Expected area to be covered.
 * @returns
 */
export function getFactor(area = 0.9999) {
  return 2 * Math.tan(Math.PI * (area - 0.5));
}

/**
 * Calculate intensity array of a lorentzian shape.
 * @returns {Float64Array} y values
 */

export function getData(options: GetDataOptions = {}) {
  let { length, factor = getFactor(), fwhm = 500, height } = options;

  if (!height) {
    height = 2 / Math.PI / fwhm;
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
