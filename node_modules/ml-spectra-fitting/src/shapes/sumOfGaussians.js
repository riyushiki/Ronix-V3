import { Gaussian } from 'ml-peak-shape-generator';
/**
 * This function calculates the spectrum as a sum of gaussian functions. The Gaussian
 * parameters are divided in 3 batches. 1st: centers; 2nd: height; 3th: widths;
 * @param t Ordinate values
 * @param p Gaussian parameters
 * @returns {*}
 */

export function sumOfGaussians(p) {
  return function (t) {
    let nL = p.length / 3;
    let result = 0;
    for (let i = 0; i < nL; i++) {
      result += p[i + nL] * Gaussian.fct(t - p[i], p[i + nL * 2]);
    }
    return result;
  };
}
