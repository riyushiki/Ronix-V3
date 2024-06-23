import { xCheck } from './xCheck';
import { xPadding } from './xPadding';
/**
 * This function calculates a rolling average
 * @param {Array<Number>} array - the array that will be rotated
 * @param {function} fct callback function that from an array returns a value.
 * @param {object} [options={}]
 * @param {number} [options.window=5] rolling window
 * @param {string} [options.padding.size=0] none, value, circular, duplicate
 * @param {string} [options.padding.algorithm='value'] none, value, circular, duplicate
 * @param {number} [options.padding.value=0] value to use for padding (if algorithm='value')
 * @return {Array<Number>}
 */
export function xRolling(array, fct, options = {}) {
  xCheck(array);
  if (typeof fct !== 'function') throw Error('fct has to be a function');

  const { window = 5, padding = {} } = options;
  const { size = window - 1, algorithm, value } = padding;

  array = xPadding(array, { size, algorithm, value }); // ensure we get a copy and it is float64

  const newArray = [];
  for (let i = 0; i < array.length - window + 1; i++) {
    let subArray = new Float64Array(array.buffer, i * 8, window);
    // we will send a view to the original buffer
    newArray.push(fct(subArray));
  }

  return newArray;
}
