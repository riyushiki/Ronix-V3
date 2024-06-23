import isArray from 'is-any-array';

/**
 * Checks if input is valdi
 * @param {Array<number>} input

 */
export function xCheck(input) {
  if (!isArray(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }
}

export function xCheckLengths(array1, array2) {
  if (array1.length !== array2.length) {
    throw new TypeError('Length of array1 and array2 must be identical');
  }
}
