import { xCrossCorrelation } from './xCrossCorrelation';

/**
 * Calculates the auto-correlation of a vector
 * @param {Array<Number>} [A] - the array that will be fixed
 * @param {object} [options={}]
 * @param {number} [options.tau=1] - sweep increment size (in number of points, min=1, max=A.length)
 * @param {number} [options.lag=A.length - 1] - scalar lag parameter
 */

export function xAutoCorrelation(A, options = {}) {
  return xCrossCorrelation(A, A, options);
}
