import { Matrix, solve } from 'ml-matrix';

import { zeroInsteadOfNegative } from '../util/zeroInsteadOfNegative';

import { checkMatrixS } from './checkMatrixS';
import { updateMatrixA } from './updateMatrixA';
import { updateMatrixS } from './updateMatrixS';

export function initialize(originalMatrix, options = {}) {
  const {
    rank,
    randGenerator,
    maxInitFBIteration,
    toleranceFBInit,
    maxFBIteration,
    toleranceFB,
    normConstrained,
  } = options;

  let result = {};
  let rows = originalMatrix.rows;

  result.A = Matrix.rand(rows, rank, { random: randGenerator });

  for (let iter = 0; iter < maxInitFBIteration; iter++) {
    //select columns with sum positive from A
    let sumC = result.A.sum('column');
    for (let i = 0; i < sumC.length; i++) {
      while (sumC[i] === 0) {
        sumC[i] = 0;
        for (let j = 0; j < rows; j++) {
          result.A.set(j, i, randGenerator());
          sumC[i] += result.A.get(j, i);
        }
      }
    }

    //resolve the system of equation Lx = D for x, then select just non negative values;
    result.S = zeroInsteadOfNegative(solve(result.A, originalMatrix));

    //select rows with positive sum by row
    let sumR = result.S.sum('row');
    let positiveSumRowIndexS = [];
    let positiveSumRowS = [];
    for (let i = 0; i < sumR.length; i++) {
      if (sumR[i] > 0) {
        positiveSumRowIndexS.push(i);
        positiveSumRowS.push(result.S.getRow(i));
      }
    }

    positiveSumRowS = Matrix.checkMatrix(positiveSumRowS);

    // solve the system of linear equation xL = D for x. knowing that D/L = (L'\D')'.
    let candidateA = zeroInsteadOfNegative(
      solve(positiveSumRowS.transpose(), originalMatrix.transpose()),
    );

    //then, set the columns of A with an index equal to the row index with sum > 0 into S
    //this step complete the last transpose of D/L = (L'\D')'.
    for (let i = 0; i < positiveSumRowIndexS.length; i++) {
      let colCandidate = candidateA.getRow(i);
      for (let j = 0; j < rows; j++) {
        result.A.set(j, positiveSumRowIndexS[i], colCandidate[j]);
      }
    }

    let prevS = result.S.clone();
    result.S = updateMatrixS(result.A, result.S, originalMatrix, 0, {
      maxFBIteration,
      toleranceFB,
    });

    result = checkMatrixS(result, originalMatrix);

    result.A = updateMatrixA(result.A, result.S, originalMatrix, 0, {
      maxFBIteration,
      toleranceFB,
      normConstrained,
    });

    if (
      Matrix.sub(prevS, result.S).norm() / result.S.norm() <
      toleranceFBInit
    ) {
      break;
    }
  }
  return result;
}
