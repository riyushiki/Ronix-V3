/**
 * Returns the closest index of a `target` in an ordered array
 * @param {array<Number>} array
 * @param {number} target
 */

export function xFindClosestIndex(array, target) {
  let low = 0;
  let high = array.length - 1;
  let middle = 0;
  while (high - low > 1) {
    middle = low + ((high - low) >> 1);
    if (array[middle] < target) {
      low = middle;
    } else if (array[middle] > target) {
      high = middle;
    } else {
      return middle;
    }
  }

  if (low < array.length - 1) {
    if (Math.abs(target - array[low]) < Math.abs(array[low + 1] - target)) {
      return low;
    } else {
      return low + 1;
    }
  } else {
    return low;
  }
}
