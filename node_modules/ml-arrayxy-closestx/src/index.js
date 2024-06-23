import binarySearch from 'binary-search';
import { ascending, descending } from 'num-sort';

/**
 *
 * @param {object} points
 * @param {Array<number>} originalPoints.x
 * @param {Array<number>} originalPoints.y
 * @param {*} options
 * @return {{x: Array<number>, y: Array<number>}}
 */
export default function closestX(points, options) {
  const { x, y } = points;
  const { target = x[0], reverse = false } = options;

  let index;
  if (reverse) {
    index = binarySearch(x, target, descending);
  } else {
    index = binarySearch(x, target, ascending);
  }

  if (index >= 0) {
    return {
      x: x[index],
      y: y[index],
    };
  } else {
    index = ~index;
    if (
      (index !== 0 && Math.abs(x[index] - target) > 0.5) ||
      index === x.length
    ) {
      return {
        x: x[index - 1],
        y: y[index - 1],
      };
    } else {
      return {
        x: x[index],
        y: y[index],
      };
    }
  }
}
