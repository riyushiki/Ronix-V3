import { Matrix } from 'ml-matrix';

import { zeroInsteadOfNegative } from '../util/zeroInsteadOfNegative';

export function checkMatrixS(data, originalMatrix) {
  let { A, S } = data;
  //check if is there at least one element cero
  let indices = [];
  let sum = S.sum('row');

  for (let i = 0; i < sum.length; i++) {
    if (sum[i] === 0) {
      indices.push(i);
      continue;
    } else {
      for (let j = 0; j < S.columns; j++) {
        if (isNaN(S.get(i, j))) {
          indices.push(i);
          break;
        }
      }
    }
  }
  // if there than just one zero or NaN element
  // run a NMF with the residual matrix Y - A*B
  if (indices.length > 0) {
    let temp = fastExtractNMF(
      originalMatrix.clone().subM(A.mmul(S)),
      indices.length,
    );
    for (let i = 0; i < indices.length; i++) {
      for (let j = 0; j < S.columns; j++) {
        S.set(indices[i], j, temp.S.get(i, j));
      }
      for (let j = 0; j < A.rows; j++) {
        A.set(j, indices[i], temp.A.get(j, i));
      }
    }
  }

  return Object.assign({}, data, { A, S });
}

function fastExtractNMF(residual, r) {
  if (r <= 0) return { A: [], S: [] };

  const { columns, rows } = residual;

  let A = Matrix.zeros(rows, r);
  let S = Matrix.zeros(r, columns);
  for (let i = 0; i < r; i++) {
    residual = zeroInsteadOfNegative(residual);
    if (residual.sum() === 0) continue;
    let res2 = Matrix.pow(residual, 2).sum('column');
    //find the max of the first column

    let maxIndex = 0;
    for (let j = 1; j < res2.length; j++) {
      if (res2[maxIndex] < res2[j]) maxIndex = j;
    }

    if (res2[maxIndex] > 0) {
      let sqrtMaxValue = Math.sqrt(res2[maxIndex]);
      for (let j = 0; j < rows; j++) {
        let value = residual.get(j, maxIndex) / sqrtMaxValue;
        A.set(j, i, value);
      }
      let temp = A.getColumnVector(i).transpose().mmul(residual);
      for (let j = 0; j < columns; j++) {
        S.set(i, j, Math.max(temp.get(0, j), 0));
      }
      let subtracting = A.getColumnVector(i).mmul(S.getRowVector(i));
      residual = residual.sub(subtracting);
    }
  }
  return { A, S };
}
