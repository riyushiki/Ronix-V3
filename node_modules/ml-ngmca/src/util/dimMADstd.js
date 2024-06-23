import { Matrix } from 'ml-matrix';

import { getMedians } from './getMedians';

export function dimMADstd(X, by) {
  let medians = getMedians(X, by);
  let matrix = X.clone();
  matrix =
    by === 'column'
      ? matrix.subRowVector(medians.to1DArray())
      : matrix.subColumnVector(medians.to1DArray());
  return Matrix.mul(getMedians(matrix.abs(), by), 1.4826);
}
