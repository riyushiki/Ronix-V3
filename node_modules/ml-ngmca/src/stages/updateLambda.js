import { Matrix } from 'ml-matrix';

import { dimMADstd } from '../util/dimMADstd';

export function updateLambda(data, originalMatrix, options = {}) {
  let { refinementBeginning, tauMAD } = options;
  let { iteration, lambda, A, S } = data;

  if (refinementBeginning <= iteration) return lambda;

  let sigmaResidue;
  if (options.lambdaInf !== undefined) {
    sigmaResidue = options.lambdaInf / options.tauMAD;
  } else if (options.addStd !== undefined) {
    sigmaResidue = options.addStd;
  } else {
    let alY = Matrix.sub(originalMatrix, A.mmul(S)).to1DArray();
    let result = dimMADstd(Matrix.from1DArray(1, alY.length, alY), 'row');
    sigmaResidue = result.get(0, 0);
  }
  let nextLambda = Math.max(
    tauMAD * sigmaResidue,
    lambda - 1 / (refinementBeginning - iteration),
  );
  return nextLambda;
}
