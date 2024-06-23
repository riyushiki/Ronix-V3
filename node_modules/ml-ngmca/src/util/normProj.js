import { normBy } from './normBy';

export function normProj(X, normLimits) {
  let norms;
  let r = X.rows;
  let c = X.columns;
  if (normLimits.rows === r) {
    norms = normBy(X, 'row');
    //select rows with norm > 0 then multiply twise by the min
    for (let i = 0; i < r; i++) {
      if (norms.get(i, 0) <= 0) continue;
      for (let j = 0; j < c; j++) {
        let value =
          X.get(i, j) *
          Math.min(norms.get(i, 0), normLimits.get(i, 0) / norms.get(i, 0));
        X.set(i, j, value);
      }
    }
  } else {
    norms = normBy(X, 'column');
    for (let i = 0; i < c; i++) {
      if (norms.get(0, i) <= 0) continue;
      for (let j = 0; j < r; j++) {
        let value =
          X.get(j, i) *
          Math.min(norms.get(0, i), normLimits.get(0, i) / norms.get(0, i));
        X.set(j, i, value);
      }
    }
  }
  return X;
}
