import { GAUSSIAN_EXP_FACTOR } from '../../../util/constants';
import erfinv from '../../../util/erfinv';
import { widthToFWHM, fwhmToWidth } from '../../1d/gaussian/Gaussian';
import { Shape2D } from '../Shape2D';

export interface XYNumber {
  x: number;
  y: number;
}

export { widthToFWHM, fwhmToWidth } from '../../1d/gaussian/Gaussian';

export interface Gaussian2DClassOptions {
  /**
   * The maximum z value of the shape
   */
  height?: number;
  /**
   * Full width at half maximum.
   * Could specify the value for each axis by a xy object or both by a number.
   * @default 50
   */
  fwhm?: number | XYNumber;
  /**
   * The halft width between the inflection points or standard deviation.
   * If it is defined the fwhm would be re-assigned.
   */
  sd?: number | XYNumber;
}

export interface GetDataOptions extends Gaussian2DClassOptions {
  /**
   * number of points along an specific axis.
   * Could specify the value for each axis by a xy object or the same value by a number
   * @default 'fwhm[axis] * factor[axis]'
   */
  length?: number | XYNumber;
  /**
   * Number of time to take fwhm to calculate length.
   * @default 'covers 99.99 % of volume'
   */
  factor?: number | XYNumber;
}

export interface GetVolumeOptions {
  /**
   * The maximum intensity value of the shape
   * @default 1
   */
  height?: number;
  /**
   * Full width at half maximum.
   * Could specify the value for each axis by a xy object or both by a number.
   */
  fwhm?: number | XYNumber;
}

export class Gaussian2D extends Shape2D {
  /**
   * Full width at half maximum.
   * Could specify the value for each axis by a xy object or both by a number.
   * @default 50
   */
  public fwhmX: number;
  public fwhmY: number;
  /**
   * The maximum z value of the shape, default keep surface equal 1.
   */
  public height: number;

  public constructor(options: Gaussian2DClassOptions = {}) {
    super();
    let { fwhm = 50, sd, height } = options;

    fwhm = ensureFWHM2D(fwhm, sd);

    this.fwhmX = fwhm.x;
    this.fwhmY = fwhm.y;

    this.height =
      height === undefined
        ? -GAUSSIAN_EXP_FACTOR / Math.PI / this.fwhmY / this.fwhmX
        : height;
  }

  public fct(x: number, y: number) {
    return fct(x, y, this.fwhmX, this.fwhmY);
  }

  public getData(options: GetDataOptions = {}) {
    const { factor, length } = options;
    return getData({
      fwhm: { x: this.fwhmY, y: this.fwhmY },
      height: this.height,
      factor,
      length,
    });
  }

  public getFactor(surface: number) {
    return getFactor(surface);
  }

  public getSurface() {
    return getSurface({
      fwhm: { x: this.fwhmY, y: this.fwhmY },
      height: this.height,
    });
  }

  public widthToFWHM(width: number) {
    return widthToFWHM(width);
  }

  public fwhmToWidth(fwhm: number) {
    return fwhmToWidth(fwhm);
  }

  public set fwhm(fwhm: number | XYNumber) {
    fwhm = ensureXYNumber(fwhm);
    this.fwhmX = fwhm.x;
    this.fwhmY = fwhm.y;
  }
}

/**
 * Return a parameterized function of a Gaussian2D shape (see README for equation).
 * @param x - x value to calculate.
 * @param y - y value to calculate.
 * @param fwhmX - full width half maximum in the x axis.
 * @param fwhmY - full width half maximum in the y axis.
 * @returns - the z value of bi-dimensional gaussian with the current parameters.
 */
export function fct(x: number, y: number, xFWHM: number, yFWHM: number) {
  return Math.exp(
    GAUSSIAN_EXP_FACTOR * (Math.pow(x / xFWHM, 2) + Math.pow(y / yFWHM, 2)),
  );
}

/**
 * Calculate the intensity matrix of a gaussian shape.
 * @returns z values.
 */

export function getData(options: GetDataOptions = {}) {
  let {
    fwhm = 50,
    factor = getFactor(),
    height,
    sd,
    length = { x: 0, y: 0 },
  } = options;

  fwhm = ensureFWHM2D(fwhm, sd);

  factor = ensureXYNumber(factor);

  length = ensureXYNumber(length);

  if (!height) {
    height = -GAUSSIAN_EXP_FACTOR / Math.PI / fwhm.y / fwhm.x;
  }

  for (const axis of ['x', 'y'] as const) {
    if (!length[axis]) {
      length[axis] = Math.min(
        Math.ceil(fwhm[axis] * factor[axis]),
        Math.pow(2, 25) - 1,
      );
      if (length[axis] % 2 === 0) length[axis]++;
    }
  }

  const xCenter = (length.x - 1) / 2;
  const yCenter = (length.y - 1) / 2;
  const data = new Array(length.x);
  for (let i = 0; i < length.x; i++) {
    data[i] = new Float64Array(length.y);
  }
  for (let i = 0; i < length.x; i++) {
    for (let j = 0; j < length.y; j++) {
      data[i][j] = fct(i - xCenter, j - yCenter, fwhm.x, fwhm.y) * height;
    }
  }
  return data;
}

/**
 * Calculate the number of times FWHM allows to reach a specific surface coverage.
 * @param [surface=0.9999] Expected volume to be covered.
 * @returns
 */
export function getFactor(surface = 0.9999) {
  return Math.sqrt(2) * erfinv(surface);
}

/**
 * Calculate the surface of gaussian shape.
 * @returns The surface of the specific shape and parameters.
 */

export function getSurface(options: GetVolumeOptions = {}) {
  let { fwhm = 50, height = 1 } = options;

  if (typeof fwhm !== 'object') fwhm = { x: fwhm, y: fwhm };

  return (height * Math.PI * fwhm.y * fwhm.x) / Math.LN2 / 4;
}

function ensureXYNumber(input: number | XYNumber): XYNumber {
  return typeof input !== 'object' ? { x: input, y: input } : { ...input };
}

function ensureFWHM2D(
  fwhm: number | XYNumber,
  sd?: number | XYNumber,
): XYNumber;

function ensureFWHM2D(
  fwhm: number | XYNumber | undefined,
  sd: number | XYNumber,
): XYNumber;

function ensureFWHM2D(
  fwhm: number | XYNumber | undefined,
  sd: number | XYNumber | undefined,
) {
  if (sd !== undefined) {
    let sdObject = ensureXYNumber(sd);
    return {
      x: widthToFWHM(2 * sdObject.x),
      y: widthToFWHM(2 * sdObject.y),
    };
  } else if (fwhm !== undefined) {
    return ensureXYNumber(fwhm);
  } else {
    throw new Error('ensureFWHM2D must have either fwhm or sd defined');
  }
}
