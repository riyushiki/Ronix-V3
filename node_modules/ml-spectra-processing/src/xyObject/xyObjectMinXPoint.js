import { xyObjectCheck } from './xyObjectCheck';

/**
 * Finds the min x value and return a {x,y,index} point
 * @param {DataXY} [points=[]] - Object that contains property x (an ordered increasing array) and y (an array)
 * @return {object}
 */

export function xyObjectMinXPoint(points = []) {
  xyObjectCheck(points);

  if (points.length < 1) return {};

  let current = {
    x: points[0].x,
    y: points[0].y,
    index: 0,
  };

  for (let i = 1; i < points.length; i++) {
    if (points[i].x < current.x) {
      current = {
        x: points[i].x,
        y: points[i].y,
        index: i,
      };
    }
  }

  return current;
}
