import { xyCheck } from './xyCheck';

/**
 * Convert a DataXY to an array of array containing x,y
 * @param {DataXY} [data] array of points {x,y}
 * @returns {Array<Array<number,number>>}
 */
export function xyToXYArray(data) {
  xyCheck(data);
  const { x, y } = data;
  let objectArray = [];
  for (let i = 0; i < x.length; i++) {
    objectArray.push([x[i], y[i]]);
  }

  return objectArray;
}
