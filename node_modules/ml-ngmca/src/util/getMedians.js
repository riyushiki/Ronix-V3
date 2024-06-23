import median from 'median-quickselect';
import { Matrix } from 'ml-matrix';

export function getMedians(X, by) {
  let medians = [];
  let rows = X.rows;
  let columns = X.columns;
  switch (by) {
    case 'column':
      for (let i = 0; i < columns; i++) {
        medians.push(median(X.getColumn(i)));
      }
      medians = Matrix.from1DArray(1, columns, medians);
      break;
    default:
      for (let i = 0; i < rows; i++) {
        medians.push(median(X.getRow(i)));
      }
      medians = Matrix.from1DArray(rows, 1, medians);
  }
  return medians;
}
