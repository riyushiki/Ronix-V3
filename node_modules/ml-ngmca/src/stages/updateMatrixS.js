import { Matrix, EVD } from 'ml-matrix';

import { getMax } from '../util/getMax';
import { zeroInsteadOfNegative } from '../util/zeroInsteadOfNegative';

export function updateMatrixS(A, Sinit, originalMatrix, lambda, options) {
  let { maxFBIteration, toleranceFB } = options;
  let At = A.transpose();
  let H = At.mmul(A);
  let AtY = At.mmul(originalMatrix);
  let evd = new EVD(H, { assumeSymmetric: true });
  let L = getMax(evd.realEigenvalues);
  let t = 1;
  let S = Sinit.clone();
  let prevS = S.clone();
  let gradient = (s) => H.mmul(s).sub(AtY);
  let proximal = (x, threshold) => zeroInsteadOfNegative(x.subS(threshold));

  for (let i = 0; i < maxFBIteration; i++) {
    let tNext = (1 + Math.sqrt(1 + 4 * t * t)) / 2;
    let w = (t - 1) / tNext;
    t = tNext;
    // R = S_k + w [S_k - S_(k-1)] = (1 + w) .* S_k - w .* S_(k-1)
    let R = Matrix.mul(S, 1 + w).sub(Matrix.mul(prevS, w));
    prevS = S.clone();
    S = proximal(R.sub(gradient(R).divS(L)), lambda / L);
    if (Matrix.sub(prevS, S).norm() / S.norm() < toleranceFB) {
      break;
    }
  }
  return S;
}
