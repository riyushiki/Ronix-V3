import { optimize } from 'ml-spectra-fitting';
import { xGetFromToIndex } from 'ml-spectra-processing';

import { groupPeaks } from './groupPeaks';

/**
 * Optimize the position (x), max intensity (y), full width at half maximum (width)
 * and the ratio of gaussian contribution (mu) if it's required. It supports three kind of shapes: gaussian, lorentzian and pseudovoigt
 * @param {object} data - An object containing the x and y data to be fitted.
 * @param {Array} peakList - A list of initial parameters to be optimized. e.g. coming from a peak picking [{x, y, width}].
 * @param {object} [options = {}] -
 * @param {number} [options.factorWidth = 1] - times of width to group peaks.
 * @param {number} [options.factorLimits = 2] - times of width to use to optimize peaks
 * @param {object} [options.shape={}] - it's specify the kind of shape used to fitting.
 * @param {string} [options.shape.kind='gaussian'] - kind of shape; lorentzian, gaussian and pseudovoigt are supported.
 * @param {string} [options.shape.options={}] - options depending the kind of shape
 * @param {object} [options.optimization={}] - it's specify the kind and options of the algorithm use to optimize parameters.
 * @param {string} [options.optimization.kind='lm'] - kind of algorithm. By default it's levenberg-marquardt.
 * @param {object} [options.optimization.options={}] - options for the specific kind of algorithm.
 * @param {number} [options.optimization.options.timeout=10] - maximum time running before break in seconds.
 */

export function optimizePeaks(data, peakList, options = {}) {
  const {
    factorWidth = 1,
    factorLimits = 2,
    shape = {
      kind: 'gaussian',
    },
    optimization = {
      kind: 'lm',
      options: {
        timeout: 10,
      },
    },
  } = options;

  if (data.x[0] > data.x[1]) {
    data.x.reverse();
    data.y.reverse();
  }

  let groups = groupPeaks(peakList, factorWidth);

  let results = [];
  for (const peaks of groups) {
    const firstPeak = peaks[0];
    const lastPeak = peaks[peaks.length - 1];

    const from = firstPeak.x - firstPeak.width * factorLimits;
    const to = lastPeak.x + lastPeak.width * factorLimits;
    const { fromIndex, toIndex } = xGetFromToIndex(data.x, { from, to });
    // Multiple peaks
    const currentRange = {
      x: data.x.slice(fromIndex, toIndex),
      y: data.y.slice(fromIndex, toIndex),
    };
    if (currentRange.x.length > 5) {
      let { peaks: optimizedPeaks } = optimize(currentRange, peaks, {
        shape,
        optimization,
      });
      results = results.concat(optimizedPeaks);
    } else {
      results = results.concat(peaks);
    }
  }
  return results;
}
