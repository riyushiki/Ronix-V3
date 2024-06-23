import { xGetTargetIndex } from '../x/xGetTargetIndex';

import { xyCheck } from './xyCheck';
/**
 * Find the closest minimum going down hill
 * @param {object} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.target]
 * @param {number} [options.targetIndex=0]
 * @return {{x,y,xIndex}} An object with the x/y value
 */

export function xyRealMaxYPoint(data, options = {}) {
  xyCheck(data);
  const { x, y } = data;
  const targetIndex = xGetTargetIndex(x, options);
  // interpolation to a sin() function
  if (
    y[targetIndex - 1] > 0 &&
    y[targetIndex + 1] > 0 &&
    y[targetIndex] >= y[targetIndex - 1] &&
    y[targetIndex] >= y[targetIndex + 1]
  ) {
    let alpha = 20 * Math.log10(y[targetIndex - 1]);
    let beta = 20 * Math.log10(y[targetIndex]);
    let gamma = 20 * Math.log10(y[targetIndex + 1]);
    let p = (0.5 * (alpha - gamma)) / (alpha - 2 * beta + gamma);
    return {
      x: x[targetIndex] + (x[targetIndex] - x[targetIndex - 1]) * p,
      y: y[targetIndex] - 0.25 * (y[targetIndex - 1] - y[targetIndex + 1]) * p,
      index: targetIndex,
    };
  } else {
    return {
      x: x[targetIndex],
      y: y[targetIndex],
      index: targetIndex,
    };
  }
}
