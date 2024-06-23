import mean from 'ml-array-mean';

/**
 *
 * @param {object} points
 * @param {Array<number>} points.x
 * @param {Array<number>} points.y
 * @param {object} [options]
 * @param {boolean} [options.unbiased = true] - if true, divide by (n-1); if false, divide by n.
 * @return {number}
 */
export default function covariance(points, options = {}) {
  const { x, y } = points;
  const { unbiased = true } = options;

  const meanX = mean(x);
  const meanY = mean(y);

  let error = 0;

  for (let i = 0; i < x.length; i++) {
    error += (x[i] - meanX) * (y[i] - meanY);
  }

  if (unbiased) {
    return error / (x.length - 1);
  } else {
    return error / x.length;
  }
}
