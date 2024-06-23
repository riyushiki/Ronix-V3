import setDifference from './util/setDifference';

// Makes sure the solution has converged
export default function optimality(
  iter,
  maxIter,
  XtX,
  XtY,
  Fset,
  Pset,
  W,
  K,
  l,
  p,
  D,
  gradientTolerance = 1e-5,
) {
  if (iter === maxIter) {
    throw new Error('Maximum number of iterations exceeded');
  }

  // Check solution for optimality
  let V = XtY.subMatrixColumn(Fset).subtract(XtX.mmul(K.subMatrixColumn(Fset)));
  for (let j = 0; j < Fset.length; j++) {
    W.setColumn(Fset[j], V.subMatrixColumn([j]));
  }
  let Jset = [];
  let fullSet = [];
  for (let i = 0; i < l; i++) {
    fullSet.push(i);
  }
  for (let j = 0; j < Fset.length; j++) {
    let notPset = setDifference(fullSet, Pset[Fset[j]]);
    if (notPset.length === 0) {
      Jset.push(Fset[j]);
    } else if (W.selection(notPset, [Fset[j]]).max() <= gradientTolerance) {
      // previously gradient tolerance was 0 and this leads to convergence problems
      Jset.push(Fset[j]);
    }
  }
  Fset = setDifference(Fset, Jset);

  // For non-optimal solutions, add the appropriate variables to Pset
  if (Fset.length !== 0) {
    for (let j = 0; j < Fset.length; j++) {
      for (let i = 0; i < l; i++) {
        if (Pset[Fset[j]].includes(i)) W.set(i, Fset[j], -Infinity);
      }
      Pset[Fset[j]].push(W.subMatrixColumn(Fset).maxColumnIndex(j)[0]);
    }
    for (let j = 0; j < Fset.length; j++) {
      D.setColumn(Fset[j], K.getColumn(Fset[j]));
    }
  }
  for (let j = 0; j < p; j++) {
    Pset[j].sort((a, b) => a - b);
  }
  return { Pset, Fset, W };
}
