import { xGetFromToIndex } from '../x/xGetFromToIndex';

import { xyCheck } from './xyCheck';

/**
 * Calculate integration
 * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.from] - First value for xyIntegration in the X scale
 * @param {number} [options.fromIndex=0] - First point for xyIntegration
 * @param {number} [options.to] - Last value for xyIntegration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for xyIntegration
 * @return {number} xyIntegration value on the specified range
 */

export function xyIntegration(data = {}, options = {}) {
  xyCheck(data);
  const { x, y } = data;
  if (x.length < 2) return 0;
  const { fromIndex, toIndex } = xGetFromToIndex(x, options);
  let currentxyIntegration = 0;
  for (let i = fromIndex; i < toIndex; i++) {
    currentxyIntegration += ((x[i + 1] - x[i]) * (y[i + 1] + y[i])) / 2;
  }

  return currentxyIntegration;
}
