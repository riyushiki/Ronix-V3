import { xFindClosestIndex } from '../x/xFindClosestIndex';

import { xyCheck } from './xyCheck';

/**
 * Returns an information about a signal
 *
 * We expect ordered data and equidistant X axis
 * You can use the method helper if required:
 * ML.ArrayPoints.uniqueX
 * ML.ArrayPoints.sortX
 * ML.ArrayPoints.equallySpaced
 *
 * @param {object} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.target]
 * @param {number} [options.targetIndex]
 * @return {object} Information about signal
 */

export function xyPeakInfo(data = {}, options = {}) {
  xyCheck(data);
  const { x, y } = data;
  if (x.length < 3) return undefined;
  let { targetIndex, target } = options;
  if (targetIndex === undefined) {
    if (target !== undefined) {
      targetIndex = xFindClosestIndex(x, target);
    }
  }

  if (targetIndex === undefined) {
    throw new Error('xyPeakInfo: need to specify target or targetIndex');
  }

  let i = targetIndex;
  let currentDiff = y[i] - y[i + 1];

  let multiplier = currentDiff < 0 ? -1 : 1;
  currentDiff *= multiplier;
  while (i < x.length - 1) {
    i++;
    let newDiff = (y[i] - y[i + 1]) * multiplier;
    if (newDiff < currentDiff) break;
    currentDiff = newDiff;
  }
  let after = { x: x[i], y: y[i] };

  i = targetIndex;
  currentDiff = (y[i] - y[i - 1]) * multiplier;
  while (i > 1) {
    i--;
    let newDiff = (y[i] - y[i - 1]) * multiplier;
    if (newDiff < currentDiff) break;
    currentDiff = newDiff;
  }
  let before = { x: x[i], y: y[i] };

  return {
    inflectionBefore: before,
    inflectionAfter: after,
    extrema: { x: x[targetIndex], y: y[targetIndex] },
    inflectionMiddle: {
      x: (before.x + after.x) / 2,
      y: (before.y + after.y) / 2,
    },
    width: Math.abs(before.x - after.x),
  };
}
