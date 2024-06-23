/**
 * Get min and max Z
 * @param {Array<Array<Number>>} [matrix] - matrix [rows][cols].
 *
 */
export function matrixMinMaxZ(matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return { min: undefined, max: undefined };
  }
  const nbRows = matrix.length;
  const nbColumns = matrix[0].length;

  let min = matrix[0][0];
  let max = matrix[0][0];

  for (let column = 0; column < nbColumns; column++) {
    for (let row = 0; row < nbRows; row++) {
      if (matrix[row][column] < min) min = matrix[row][column];
      if (matrix[row][column] > max) max = matrix[row][column];
    }
  }

  return { min, max };
}
