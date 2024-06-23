import { Matrix } from 'ml-matrix';

export function normBy(x, by = 'column') {
  let norms = Matrix.mul(x, x).sum(by);
  let length = norms.length;
  for (let i = 0; i < length; i++) {
    norms[i] = Math.sqrt(norms[i]);
  }
  return by === 'row'
    ? Matrix.from1DArray(length, 1, norms)
    : Matrix.from1DArray(1, length, norms);
}
