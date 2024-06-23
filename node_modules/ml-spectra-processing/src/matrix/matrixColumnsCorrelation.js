import { Matrix } from 'ml-matrix';

import { xCorrelation } from '../x/xCorrelation';
/**
 * Calculates a correlation matrix based on the columns of the initial matrix
 *
 * @param {Array<Array§Number°>} [A] - matrix [rows][cols]
 * @return {Array}
 */
export function matrixColumnsCorrelation(A) {
  A = new Matrix(A);
  A = A.transpose();
  let result = [];
  for (let i = 0; i < A.rows; i++) {
    result.push(new Float64Array(A.rows));
  }
  for (let i = 0; i < A.rows; i++) {
    for (let j = i; j < A.rows; j++) {
      let correlation = xCorrelation(A.getRow(i), A.getRow(j));
      result[i][j] = correlation;
      result[j][i] = correlation;
    }
  }

  return result;
}
