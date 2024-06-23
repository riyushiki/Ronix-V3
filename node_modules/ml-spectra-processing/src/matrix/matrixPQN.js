import median from 'ml-array-median';
import { Matrix } from 'ml-matrix';

/**
 * Performs a Probabilistic quotient normalization (PQN) over the dataset to account dilution based in median spectrum.
 * Dieterle, F., Ross, A., Schlotterbeck, G., & Senn, H. (2006). Probabilistic quotient normalization as robust method to account for dilution of complex biological mixtures. Application in 1H NMR metabonomics. Analytical chemistry, 78(13), 4281-4290.
 * DOI: 10.1021/ac051632c
 * @param {Array<Array<Number>>} [matrix] - matrix [rows][cols].
 * @param {Object} [options={}]
 * @param {number} [options.max=100] - Normalization integral constant.
 * @return {Object} { data, medianOfQuotients }.
 * data: Normalized dataset.
 * medianOfQuotients: The median of quotients of each variables.
 */
export function matrixPQN(matrix, options = {}) {
  const { max = 100 } = options;
  matrix = new Matrix(matrix);
  for (let i = 0; i < matrix.rows; i++) {
    const normalizationFactor = matrix.getRowVector(i).norm() / max;
    const row = matrix.getRowVector(i).div(normalizationFactor);
    matrix.setRow(i, row);
  }

  let referenceSpectrum = [];
  for (let i = 0; i < matrix.columns; i++) {
    const currentVariable = matrix.getColumn(i);
    referenceSpectrum.push(median(currentVariable));
  }

  let medianOfQuotients = [];
  for (let i = 0; i < matrix.columns; i++) {
    let quotients = matrix.getColumnVector(i).div(referenceSpectrum[i]);
    medianOfQuotients.push(median(quotients.getColumn(0)));
  }

  for (let i = 0; i < matrix.rows; i++) {
    matrix.mulRow(i, 1 / medianOfQuotients[i]);
  }

  return {
    data: matrix.to2DArray(),
    medianOfQuotients: medianOfQuotients,
  };
}
