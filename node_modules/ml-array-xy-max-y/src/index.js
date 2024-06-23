import binarySearch from 'binary-search';
import { ascending, descending } from 'num-sort';

/**
 * @param {object} points
 * @param {Array<number>} points.x - sorted abscissas values
 * @param {Array<number>} points.y - ordinates values
 * @param {object} [options]
 * @param {object} [options.from = {index: 0}]
 * @param {object} [options.to = {index: x.length-1}]
 * @param {boolean} [options.reverse = false]
 * @return {{index: number, value: number}}
 */
export default function maxY(points, options = {}) {
  const { x, y } = points;
  let {
    from = { index: 0 },
    to = { index: x.length },
    reverse = false,
  } = options;

  if (from.value !== undefined && from.index === undefined) {
    from.index = calculateIndex(from.value, x, reverse);
  }

  if (to.value !== undefined && to.index === undefined) {
    to.index = calculateIndex(to.value, x, reverse);
  }

  let currentMax = Number.MIN_VALUE;
  let currentIndex;
  for (let i = from.index; i < to.index; i++) {
    if (currentMax < y[i]) {
      currentMax = y[i];
      currentIndex = i;
    }
  }

  return {
    index: currentIndex,
    value: currentMax,
  };
}

/**
 * @param {number} value
 * @param {Array<number>} x
 * @param {boolean} reverse
 * @return {number} index of the value in the array
 */
function calculateIndex(value, x, reverse) {
  let index;
  if (reverse) {
    index = binarySearch(x, value, descending);
  } else {
    index = binarySearch(x, value, ascending);
  }

  if (index < 0) {
    throw new Error(`the value ${value} doesn't belongs to the abscissa value`);
  }

  return index;
}
