import isArray from 'is-any-array';

/**
 * Calculate a new array of the same size that is the cumulative values
 * @param {Array<number>} isArray
 * @returns {Array<number}
 */
export function xCumulative(array) {
  if (!isArray(array)) {
    throw new TypeError('input must be an array');
  }

  let newArray = new Float64Array(array.length);
  if (array.length < 1) return newArray;

  newArray[0] = array[0];
  for (let i = 1; i < array.length; i++) {
    newArray[i] = newArray[i - 1] + array[i];
  }
  return newArray;
}
