import { xCheck } from './xCheck';
/**
 * Computes the index of the maximum of the given values
 * @param {Array<number>} array
 * @return {number}
 */
export function xMaxIndex(array) {
  xCheck(array);

  let maxIndex = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[maxIndex]) {
      maxIndex = i;
    }
  }
  return maxIndex;
}
