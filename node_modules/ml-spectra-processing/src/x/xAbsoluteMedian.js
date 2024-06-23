import median from 'ml-array-median';

import { xAbsolute } from './xAbsolute';
/**
 * This function calculates the median after taking the reimAbsolute values of the points
 * @param {Array<Number>} array - the array that will be rotated
 * @return {Number}
 */
export function xAbsoluteMedian(array) {
  return median(xAbsolute(array));
}
