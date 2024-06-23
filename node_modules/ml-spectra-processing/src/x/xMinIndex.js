import { xCheck } from './xCheck';

/**
 * Computes the index of the minimum of the given values
 * @param {Array<number>} array
 * @return {number}
 */
export function xMinIndex(array) {
  xCheck(array);
  let minIndex = 0;
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[minIndex]) {
      minIndex = i;
    }
  }
  return minIndex;
}
