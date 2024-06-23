import { Matrix } from 'ml-matrix';

export function zeroInsteadOfNegative(X) {
  let rows = X.rows;
  let columns = X.columns;
  let newMatrix = new Matrix(X);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (newMatrix.get(r, c) < 0) {
        newMatrix.set(r, c, 0);
      }
    }
  }
  return newMatrix;
}
