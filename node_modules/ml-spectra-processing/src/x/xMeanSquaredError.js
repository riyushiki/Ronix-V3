import { xCheckLengths } from './xCheck.js';

/**
 * This function calculates the mean squared error
 * @param {Array<number>} array1 -
 * @param {Array<number>} array2
 * @return {Number}
 */
export function xMeanSquaredError(array1, array2) {
  xCheckLengths(array1, array2);
  let sum = 0;
  for (let i = 0; i < array1.length; i++) {
    sum += Math.pow(array1[i] - array2[i], 2);
  }
  return sum / array1.length;
}
