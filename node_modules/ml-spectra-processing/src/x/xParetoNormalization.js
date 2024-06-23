import sd from 'ml-array-standard-deviation';

import { xCheck } from './xCheck';

/**
 * Pareto scaling, which uses the square root of standard deviation as the scaling factor, circumvents the amplification of noise by retaining a small portion of magnitude information.
 * Noda, I. (2008). Scaling techniques to enhance two-dimensional correlation spectra. Journal of Molecular Structure, 883, 216-227.
 * DOI: 10.1016/j.molstruc.2007.12.026
 * @param {Array<Number>} array
 * @return {Array}
 */
export function xParetoNormalization(array) {
  xCheck(array);
  let result = [];
  const sqrtSD = Math.sqrt(sd(array));

  for (let item of array) {
    result.push(item / sqrtSD);
  }
  return result;
}
