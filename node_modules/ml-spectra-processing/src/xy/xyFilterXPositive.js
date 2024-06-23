import { xyCheck } from './xyCheck';
/**
 * Filter out all the points for which x <= 0. Useful to display log scale data
 * @param {DataXY} [data={}]
 * @return {{x:[],y:[]}} An object with the filtered data
 */

export function xyFilterXPositive(data = {}) {
  xyCheck(data);
  const { x, y } = data;
  const newX = [];
  const newY = [];
  for (let i = 0; i < x.length; i++) {
    if (x[i] > 0) {
      newX.push(x[i]);
      newY.push(y[i]);
    }
  }

  return { x: newX, y: newY };
}
