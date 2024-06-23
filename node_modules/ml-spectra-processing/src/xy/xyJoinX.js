import { xyCheck } from './xyCheck';
/**
 * Join x / y values when difference in X is closer than delta.
 * When joining, y values are summed and x values are weighted average
 * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number|function} [options.delta=1] The range in which the two x values of the spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
 * @return {DataXY} An object with the xyIntegration function
 */

export function xyJoinX(data = {}, options = {}) {
  xyCheck(data);
  const { delta = 1 } = options;
  const deltaIsFunction = typeof delta === 'function';
  const x = Array.from(data.x);
  const y = Array.from(data.y);
  if (x.length < 2) {
    return { x, y };
  }
  let position = 0;

  for (let i = 1; i < x.length; i++) {
    let difference = x[i] - x[i - 1];
    let currentDelta = deltaIsFunction ? delta((x[i] + x[i - 1]) / 2) : delta;

    if (difference <= currentDelta) {
      // we join
      if (y[position] !== 0 || y[i] !== 0) {
        x[position] =
          (x[position] * y[position] + x[i] * y[i]) / (y[position] + y[i]);
        y[position] += y[i];
      }
    } else {
      position++;
      x[position] = x[i];
      y[position] = y[i];
    }
  }

  x.length = position + 1;
  y.length = position + 1;
  return { x, y };
}
