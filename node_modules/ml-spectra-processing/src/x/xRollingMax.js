import max from 'ml-array-max';

import { xRolling } from './xRolling';

/**
 * This function calculates a maximum within a rolling window
 * @param {Array<Number>} array - the array that will be rotated
 * @param {object} [options={}]
 * @param {number} [options.window=5] rolling window
 * @param {string} [options.padding.size=window-1] none, value, circular, duplicate
 * @param {string} [options.padding.algorithm=''] none, value, circular, duplicate
 * @param {number} [options.padding.value=0] value to use for padding (if algorithm='value')
 * @return {Array<Number>}
 */
export function xRollingMax(array, options = {}) {
  return xRolling(array, max, options);
}
