import { optimize } from 'ml-spectra-fitting';

/**
 * This function try to join the peaks that seems to belong to a broad signal in a single broad peak.
 * @param {Array} peakList - A list of initial parameters to be optimized. e.g. coming from a peak picking [{x, y, width}].
 * @param {object} [options = {}] - options
 * @param {number} [options.width=0.25] - width limit to join peaks.
 * @param {object} [options.shape={}] - it's specify the kind of shape used to fitting.
 * @param {string} [options.shape.kind = 'gaussian'] - kind of shape; lorentzian, gaussian and pseudovoigt are supported.
 * @param {object} [options.optimization = {}] - it's specify the kind and options of the algorithm use to optimize parameters.
 * @param {string} [options.optimization.kind = 'lm'] - kind of algorithm. By default it's levenberg-marquardt.
 * @param {number} [options.optimization.options.timeout = 10] - maximum time running before break in seconds.
 * @param {object} [options.optimization.options = {}] - options for the specific kind of algorithm.
 */
export function joinBroadPeaks(peakList, options = {}) {
  let {
    width = 0.25,
    shape = { kind: 'gaussian' },
    optimization = { kind: 'lm', timeout: 10 },
  } = options;
  let broadLines = [];
  // Optimize the possible broad lines
  let max = 0;

  let maxI = 0;

  let count = 1;
  for (let i = peakList.length - 1; i >= 0; i--) {
    if (peakList[i].soft) {
      broadLines.push(peakList.splice(i, 1)[0]);
    }
  }
  // Push a feke peak
  broadLines.push({ x: Number.MAX_VALUE });

  let candidates = { x: [broadLines[0].x], y: [broadLines[0].y] };
  let indexes = [0];
  for (let i = 1; i < broadLines.length; i++) {
    if (Math.abs(broadLines[i - 1].x - broadLines[i].x) < width) {
      candidates.x.push(broadLines[i].x);
      candidates.y.push(broadLines[i].y);
      if (broadLines[i].y > max) {
        max = broadLines[i].y;
        maxI = i;
      }
      indexes.push(i);
      count++;
    } else {
      if (count > 2) {
        let fitted = optimize(
          candidates,
          [
            {
              x: broadLines[maxI].x,
              y: max,
              width: Math.abs(
                candidates.x[0] - candidates.x[candidates.x.length - 1],
              ),
            },
          ],
          { shape, optimization },
        );
        let { peaks: peak } = fitted;
        peak[0].index = Math.floor(
          indexes.reduce((a, b) => a + b, 0) / indexes.length,
        );
        peak[0].soft = false;
        peakList.push(peak[0]);
      } else {
        // Put back the candidates to the signals list
        indexes.forEach((index) => {
          peakList.push(broadLines[index]);
        });
      }
      candidates = { x: [broadLines[i].x], y: [broadLines[i].y] };
      indexes = [i];
      max = broadLines[i].y;
      maxI = i;
      count = 1;
    }
  }
  peakList.sort((a, b) => {
    return a.x - b.x;
  });

  return peakList;
}
