import { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';
/**
 * Check that x and y are arrays with the same length.
 * @param x - first array
 * @param y - second array
 * @throws if x or y are not the same length, or if they are not arrays
 */
export default function checkArrayLength(x: NumberArray, y: NumberArray) {
  if (!isAnyArray(x) || !isAnyArray(y)) {
    throw new TypeError('x and y must be arrays');
  }
  if (x.length !== y.length) {
    throw new RangeError('x and y arrays must have the same length');
  }
}
