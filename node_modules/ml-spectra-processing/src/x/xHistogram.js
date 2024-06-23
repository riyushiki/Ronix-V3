import fill from 'ml-array-sequential-fill';

import { xAbsolute } from './xAbsolute';
import { xCheck } from './xCheck';
import { xMaxValue } from './xMaxValue';
import { xMinValue } from './xMinValue';

/**
 * Calculates an histogram of defined number of slots
 * @param {array} [array] Array containing values
 * @param {number} [options.nbSlots=256] Number of slots
 * @param {number} [options.min=minValue] Minimum value to calculate used to calculate slot size
 * @param {number} [options.max=maxValue] Maximal value to calculate used to calculate slot size
 * @param {number} [options.logBaseX] We can first apply a log on x axis
 * @param {number} [options.logBaseY] We can apply a log on the resulting histogram
 * @param {boolean} [options.absolute] Take the absolute value
 * @param {number} [options.centerX=true] Center the X value. We will enlarge the first and last values.
 * @param {DataXY} [options.histogram={x:[], y:[]}] Previously existing histogram to continue to fill
 * @return {DataXY} {x,y} of the histogram
 */

export function xHistogram(array, options = {}) {
  xCheck(array);
  let histogram = options.histogram;
  const {
    centerX = true,
    nbSlots = histogram === undefined ? 256 : histogram.x.length,
    logBaseX,
    logBaseY,
    absolute = false,
  } = options;

  if (absolute) {
    array = xAbsolute(array);
  }

  if (logBaseX) {
    array = array.slice();
    const logOfBase = Math.log10(logBaseX);
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.log10(array[i]) / logOfBase;
    }
  }

  const { min = xMinValue(array), max = xMaxValue(array) } = options;
  const slotSize = (max - min) / (nbSlots + Number.EPSILON);

  const y = histogram === undefined ? new Float64Array(nbSlots) : histogram.y;
  const x =
    histogram === undefined
      ? fill({
          from: min + (centerX ? slotSize / 2 : 0),
          to: max - (centerX ? slotSize / 2 : 0),
          size: nbSlots,
        })
      : histogram.x;
  for (let i = 0; i < array.length; i++) {
    const index = Math.max(
      Math.min(
        ((array[i] - min - Number.EPSILON) / slotSize) >> 0,
        nbSlots - 1,
      ),
      0,
    );
    y[index]++;
  }

  if (logBaseY) {
    const logOfBase = Math.log10(logBaseY);
    for (let i = 0; i < y.length; i++) {
      y[i] = Math.log10(y[i] + 1) / logOfBase;
    }
  }

  return { x, y };
}
