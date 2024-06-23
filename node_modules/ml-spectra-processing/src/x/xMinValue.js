import { xCheck } from './xCheck';

/**
 * Computes the minimal value of an array of values
 * @param {Array<number>} array
 * @param {object} [options={}]
 * @param {number} [options.fromIndex=0] - First point for xyIntegration
 * @param {number} [options.toIndex=x.length-1] - Last point for xyIntegration
 * @return {number}
 */
export function xMinValue(array, options = {}) {
  xCheck(array);
  const { fromIndex = 0, toIndex = array.length - 1 } = options;
  let minValue = array[fromIndex];

  for (let i = fromIndex + 1; i <= toIndex; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    }
  }
  return minValue;
}
