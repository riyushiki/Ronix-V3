/**
 * Merge abscissas values on similar ordinates and weight the group of abscissas
 * @param {object} points
 * @param {Array<number>} points.x - sorted abscissas values
 * @param {Array<number>} points.y - ordinates values
 * @param {object} [options]
 * @param {number} [options.groupWidth = 0.001] - window for abscissas to merge
 * @return {{x: Array<number>, y: Array<number>}}
 */
export default function weightedMerge(points, options = {}) {
  const { x, y } = points;
  const { groupWidth = 0.001 } = options;

  let merged = { x: [], y: [] };
  let weightedAbscissa = { x: [], y: [] };
  let size = 0;
  let index = 0;

  while (index < x.length) {
    if (size === 0 || x[index] - merged.x[size - 1] > groupWidth) {
      weightedAbscissa.x.push(x[index] * y[index]);
      weightedAbscissa.y.push(y[index]);
      merged.x.push(x[index]);
      merged.y.push(y[index]);
      index++;
      size++;
    } else {
      weightedAbscissa.x[size - 1] += x[index] * y[index];
      weightedAbscissa.y[size - 1] += y[index];
      merged.x[size - 1] = x[index];
      merged.y[size - 1] += y[index];
      index++;
    }
  }

  for (let i = 0; i < merged.x.length; i++) {
    merged.x[i] = weightedAbscissa.x[i] / weightedAbscissa.y[i];
  }

  return merged;
}
