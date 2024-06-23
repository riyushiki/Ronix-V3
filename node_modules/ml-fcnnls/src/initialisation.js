import { Matrix } from 'ml-matrix';

import cssls from './cssls';

export default function initialisation(X, Y) {
  let n = X.rows;
  let l = X.columns;
  let p = Y.columns;
  let iter = 0;

  if (Y.rows !== n) throw new Error('ERROR: matrix size not compatible');

  let W = Matrix.zeros(l, p);

  // precomputes part of pseudoinverse
  let XtX = X.transpose().mmul(X);
  let XtY = X.transpose().mmul(Y);

  let K = cssls(XtX, XtY, null, l, p); // K is lxp
  let Pset = [];
  for (let j = 0; j < p; j++) {
    Pset[j] = [];
    for (let i = 0; i < l; i++) {
      if (K.get(i, j) > 0) {
        Pset[j].push(i);
      } else {
        K.set(i, j, 0);
      } //This is our initial solution, it's the solution found by overwriting the unconstrained least square solution
    }
  }
  let Fset = [];
  for (let j = 0; j < p; j++) {
    if (Pset[j].length !== l) {
      Fset.push(j);
    }
  }

  let D = K.clone();

  return { n, l, p, iter, W, XtX, XtY, K, Pset, Fset, D };
}
