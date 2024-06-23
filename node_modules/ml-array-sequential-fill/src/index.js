import { isAnyArray } from 'is-any-array';

/**
 * Fill an array with sequential numbers
 * @param {Array<number>} [input] - optional destination array (if not provided a new array will be created)
 * @param {object} [options={}]
 * @param {number} [options.from=0] - first value in the array
 * @param {number} [options.to=10] - last value in the array
 * @param {number} [options.size=input.length] - size of the array (if not provided calculated from step)
 * @param {number} [options.step] - if not provided calculated from size
 * @return {Array<number>}
 */
export default function sequentialFill(input = [], options = {}) {
  if (typeof input === 'object' && !isAnyArray(input)) {
    options = input;
    input = [];
  }

  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  let { from = 0, to = 10, size = input.length, step } = options;

  if (size !== 0 && step) {
    throw new Error('step is defined by the array size');
  }

  if (!size) {
    if (step) {
      size = Math.floor((to - from) / step) + 1;
    } else {
      size = to - from + 1;
    }
  }
  if (!step && size) {
    step = (to - from) / (size - 1);
  }
  if (Array.isArray(input)) {
    // only works with normal array
    input.length = 0;
    for (let i = 0; i < size; i++) {
      input.push(from);
      from += step;
    }
  } else {
    if (input.length !== size) {
      throw new Error(
        'sequentialFill typed array must have the correct length',
      );
    }
    for (let i = 0; i < size; i++) {
      input[i] = from;
      from += step;
    }
  }

  return input;
}
