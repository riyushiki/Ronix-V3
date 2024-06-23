import mean from 'ml-array-mean';
import { gsd } from 'ml-gsd';

import { xFindClosestIndex } from '../x/xFindClosestIndex';

/**
 * Calibrates the data based on a range and means of peaks in this range
 * Based on a range we will make a peak picking using global spectra deconvolution
 * The selected nbPeaks will then be taken into account to calculate an average X value.
 * The difference between the targetX and the averageX value will be returned
 * @param {DataXY} [data] array of points {x,y}
 * @param {Object} [range={}]
 * @param {number} [range.from] - Beginning of the range where the interest signal is localed
 * @param {number} [range.to] - End of the range where the interest signal is localed
 * @param {Object} [options={}]
 * @param {number} [options.nbPeaks=1] Number of peaks to consider to calculate mean (sorted by height)
 * @param {number} [options.targetX=0] Expected value for the mean of the peaks position
 * @param {number} [options.gsd={}] GSD options. You may check options here: http://mljs.github.io/global-spectral-deconvolution/#gsd
 * @param {number} [options.gsd.minMaxRatio=0.2] - GSD Threshold to determine if a given peak should be considered as a noise.
 * @returns {number} difference between targetX and currentX
 */

export function xyCalibrate(data, range = {}, options = {}) {
  const {
    targetX = 0,
    nbPeaks = 1,
    gsd: gsdOptions = {
      minMaxRatio: 0.1,
      realTopDetection: true,
      smoothY: true,
      sgOptions: {
        windowSize: 7,
        polynomial: 3,
      },
    },
  } = options;
  let { from, to } = range;
  if (from === undefined || to === undefined) return 0;

  const fromIndex = xFindClosestIndex(data.x, from);
  const toIndex = xFindClosestIndex(data.x, to);
  const sliceddata = {
    x: data.x.slice(fromIndex, toIndex),
    y: data.y.slice(fromIndex, toIndex),
  };

  let peaks = gsd(sliceddata, gsdOptions)
    .sort((a, b) => b.y - a.y)
    .slice(0, nbPeaks);

  if (peaks.length === 0) return 0;

  const middle = mean(peaks.map((peak) => peak.x));

  return targetX - middle;
}
