import { Matrix, EVD } from 'ml-matrix';

import { normBy } from '../util/normBy';
import { normProj } from '../util/normProj';
import { zeroInsteadOfNegative } from '../util/zeroInsteadOfNegative';

export function updateMatrixA(Ainit, S, originalMatrix, options) {
  let {
    maxFBIteration,
    toleranceFB,
    normConstrained = false,
    lambda,
  } = options;
  let St = S.transpose();
  let H = S.mmul(St);
  let YSt = originalMatrix.mmul(St);
  let evd = new EVD(H, { assumeSymmetric: true });
  let L = Math.max(...evd.realEigenvalues);
  let A = Ainit;
  let prevA = A.clone();
  let t = 1;

  let gradient = (a) => a.mmul(H).sub(YSt);
  let proximal;
  if (normConstrained) {
    let normLimits = normBy(Ainit, 'column');
    proximal = (x, threshold) =>
      normProj(zeroInsteadOfNegative(x.subS(threshold)), normLimits);
  } else {
    proximal = (x, threshold) => zeroInsteadOfNegative(x.subS(threshold));
  }

  for (let i = 0; i < maxFBIteration; i++) {
    let tNext = (1 + Math.sqrt(1 + 4 * t * t)) / 2;
    let w = (t - 1) / tNext;
    t = tNext;
    let B = Matrix.mul(A, w + 1).sub(Matrix.mul(prevA, w));
    prevA = A.clone();
    A = proximal(B.sub(gradient(B).divS(L)), lambda / L);
    if (Matrix.sub(prevA, A).norm() / A.norm() < toleranceFB) {
      break;
    }
  }
  return A;
}
