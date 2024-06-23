/* *
 * Finds the median x value for an object with properties x and y (arrays of the same length)
 * @param {object} data x should be sorted in increasing order
 * @returns {number} the median of x values
 */

export function xyMedian(data) {
  const { x, y } = data;

  let sumY = 0;
  let cumSumY = 0;
  let i;

  if (x.length === 0) {
    return NaN;
  }

  if (x.length === 1) {
    return x[0];
  }

  for (i = 0; i < y.length; i++) {
    sumY += y[i];
  }

  for (i = 0; i < y.length; i++) {
    cumSumY += y[i];
    if (cumSumY > sumY / 2) {
      return x[i];
    } else if (cumSumY === sumY / 2) {
      return 0.5 * (x[i] + x[i + 1]);
    }
  }
}
