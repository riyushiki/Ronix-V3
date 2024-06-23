/**
 * Rescale columns
 * @param {Array<Array<Number>>} [matrix] - matrix [rows][cols].
 * @param {object} [options={}]
 * @param {object} [options.min=0]
 * @param {object} [options.max=1]
 *
 */
export function matrixZRescale(matrix, options = {}) {
  const { min = 0, max = 1 } = options;
  const nbRows = matrix.length;
  const nbColumns = matrix[0].length;
  const newMatrix = new Array(nbRows);
  for (let row = 0; row < nbRows; row++) {
    newMatrix[row] = new Float64Array(nbColumns);
  }
  for (let column = 0; column < nbColumns; column++) {
    let currentMin = matrix[0][column];
    let currentMax = matrix[0][column];
    for (let row = 1; row < nbRows; row++) {
      if (matrix[row][column] < currentMin) currentMin = matrix[row][column];
      if (matrix[row][column] > currentMax) currentMax = matrix[row][column];
    }

    const factor = (max - min) / (currentMax - currentMin);

    for (let row = 0; row < nbRows; row++) {
      newMatrix[row][column] =
        (matrix[row][column] - currentMin) * factor + min;
    }
  }
  return newMatrix;
}
