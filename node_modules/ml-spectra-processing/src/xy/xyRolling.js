import { xRolling } from '../x/xRolling';
import { xRollingAverage } from '../x/xRollingAverage';
/**
 * This function calculates a rolling average
 *
 * This methods will recalculate the x values by using xRollingAverage
 * @param {ArrayPoints} [points] array of points {x,y}
 * @param {object} [options={}]
 * @param {number} [options.window=5] rolling window
 * @param {function} [fct] callback function that from an array returns a value.
 * @param {string} [options.padding.size=0] none, value, circular, duplicate
 * @param {string} [options.padding.algorithm='value'] none, value, circular, duplicate
 * @param {number} [options.padding.value=0] value to use for padding (if algorithm='value')
 * @return {Array<Number>}
 */
export function xyRolling(points, fct, options = {}) {
  let { x, y } = points;

  y = xRolling(y, fct, options);

  if (x.length !== y.length) {
    x = xRollingAverage(x, options);
  }

  return { x, y };
}
