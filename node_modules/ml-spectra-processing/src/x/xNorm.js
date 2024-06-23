/**
 * This function calculate the norm of a vector
 * @example xNorm([3, 4]) -> 5
 * @param {Array} array - the array that will be rotated
 * @return {number} calculated norm
 */
export function xNorm(array) {
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result += array[i] ** 2;
  }
  return Math.sqrt(result);
}
