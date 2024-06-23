import { Matrix } from 'ml-matrix';

import { checkMatrixS } from './stages/checkMatrixS';
import { initialize } from './stages/initialize';
import { normalize } from './stages/normalize';
import { updateLambda } from './stages/updateLambda';
import { updateMatrixA } from './stages/updateMatrixA';
import { updateMatrixS } from './stages/updateMatrixS';

/**
 * Performing non-negative matrix factorization solving argmin_(A >= 0, S >= 0) 1 / 2 * ||Y - AS||_2^2 + lambda * ||S||_1
 * @param {Matrix||Array<Array>} originalMatrix - Matrix to be separated.
 * @param {Number} rank - The maximum number of linearly independent column/row vectors in the matrix.
 * @param {Object} [options = {}] - Options of ngmca factorization method.
 * @param {Number} [options.maximumIteration = 500] - Maximum number of iterations.
 * @param {Number} [options.maxFBIteration = 80] - Maximum number of iterations of the Forward-Backward subroutine.
 * @param {Object} [options.randGenerator = Math.random] - Random number generator for the subroutine of initialization.
 * @param {Number} [options.maxInitFBIteration = 50] - Maximum number of iterations of the Forward-Backward subroutine at the initialization.
 * @param {Number} [options.toleranceFB = 1e-5] - relative difference tolerance for convergence of the Forward-Backward sub-iterations.
 * @param {Number} [options.toleranceFBInit = 0] - relative difference tolerance for convergence of the Forward-Backward sub-iterations at the initialization.
 * @param {Number} [options.phaseRatio = 0.8] - transition between decreasing thresholding phase and refinement phase in percent of the iterations.
 * @param {Number} [options.tauMAD = 1] - constant coefficient for the final threshold computation.
 * @param {Boolean} [options.useTranspose = false] - if true the originalMatrix is transposed.
 */

export function nGMCA(originalMatrix, rank, options = {}) {
  const {
    maximumIteration = 500,
    maxFBIteration = 80,
    maxInitFBIteration = 50,
    toleranceFBInit = 0,
    toleranceFB = 0.00001,
    phaseRatio = 0.8,
    randGenerator = Math.random,
    tauMAD = 1,
    useTranspose = false,
  } = options;

  let { normConstrained = false } = options;
  originalMatrix = Matrix.checkMatrix(originalMatrix);
  if (useTranspose) originalMatrix = originalMatrix.transpose();
  let refinementBeginning = Math.floor(phaseRatio * maximumIteration);

  let data = initialize(originalMatrix, {
    rank,
    randGenerator,
    maxInitFBIteration,
    toleranceFBInit,
    maxFBIteration,
    toleranceFB,
  });

  data = normalize(data, { normOnA: true });
  data.lambda = data.A.transpose()
    .mmul(data.A.mmul(data.S).sub(originalMatrix))
    .abs()
    .max();

  for (let iter = 0; iter < maximumIteration; iter++) {
    data.iteration = iter;
    data.S = updateMatrixS(
      data.A,
      data.S,
      originalMatrix,
      data.lambda,
      options,
    );
    data = checkMatrixS(data, originalMatrix);
    data = normalize(data, { normOnA: false });

    if (iter > refinementBeginning) normConstrained = true;

    data.A = updateMatrixA(data.A, data.S, originalMatrix, {
      maxFBIteration,
      toleranceFB,
      normConstrained,
      lambda: 0,
    });

    data = normalize(data, { normOnA: true });

    data.lambda = updateLambda(data, originalMatrix, {
      refinementBeginning,
      tauMAD,
    });
  }

  if (useTranspose) {
    let temp = data.A.transpose();
    data.A = data.S.transpose();
    data.S = temp;
  }
  return data;
}
