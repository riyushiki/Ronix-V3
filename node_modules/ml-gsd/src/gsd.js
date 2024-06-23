import { getShape1D } from 'ml-peak-shape-generator';
import SG from 'ml-savitzky-golay-generalized';

/**
 * Global spectra deconvolution
 * @param {object} data - Object data with x and y arrays
 * @param {Array<number>} [data.x] - Independent variable
 * @param {Array<number>} [data.y] - Dependent variable
 * @param {object} [options={}] - Options object
 * @param {object} [options.shape={}] - Object that specified the kind of shape to calculate the FWHM instead of width between inflection points. see https://mljs.github.io/peak-shape-generator/#inflectionpointswidthtofwhm
 * @param {object} [options.shape.kind='gaussian']
 * @param {object} [options.shape.options={}]
 * @param {object} [options.sgOptions] - Options object for Savitzky-Golay filter. See https://github.com/mljs/savitzky-golay-generalized#options
 * @param {number} [options.sgOptions.windowSize = 9] - points to use in the approximations
 * @param {number} [options.sgOptions.polynomial = 3] - degree of the polynomial to use in the approximations
 * @param {number} [options.minMaxRatio = 0.00025] - Threshold to determine if a given peak should be considered as a noise
 * @param {number} [options.broadRatio = 0.00] - If `broadRatio` is higher than 0, then all the peaks which second derivative
 * smaller than `broadRatio * maxAbsSecondDerivative` will be marked with the soft mask equal to true.
 * @param {number} [options.noiseLevel = 0] - Noise threshold in spectrum units
 * @param {boolean} [options.maxCriteria = true] - Peaks are local maximum(true) or minimum(false)
 * @param {boolean} [options.smoothY = true] - Select the peak intensities from a smoothed version of the independent variables
 * @param {boolean} [options.realTopDetection = false] - Use a quadratic optimizations with the peak and its 3 closest neighbors
 * to determine the true x,y values of the peak?
 * @param {number} [options.heightFactor = 0] - Factor to multiply the calculated height (usually 2)
 * @param {number} [options.derivativeThreshold = -1] - Filters based on the amplitude of the first derivative
 * @return {Array<object>}
 */
export function gsd(data, options = {}) {
  let {
    noiseLevel,
    sgOptions = {
      windowSize: 9,
      polynomial: 3,
    },
    shape = {},
    smoothY = true,
    heightFactor = 0,
    broadRatio = 0.0,
    maxCriteria = true,
    minMaxRatio = 0.00025,
    derivativeThreshold = -1,
    realTopDetection = false,
  } = options;

  let { y: yIn, x } = data;

  const y = yIn.slice();
  let equalSpaced = isEqualSpaced(x);

  if (maxCriteria === false) {
    for (let i = 0; i < y.length; i++) {
      y[i] *= -1;
    }
  }

  if (noiseLevel === undefined) {
    noiseLevel = equalSpaced ? getNoiseLevel(y) : 0;
  }
  for (let i = 0; i < y.length; i++) {
    y[i] -= noiseLevel;
  }
  for (let i = 0; i < y.length; i++) {
    if (y[i] < 0) {
      y[i] = 0;
    }
  }
  // If the max difference between delta x is less than 5%, then,
  // we can assume it to be equally spaced variable
  let yData = y;
  let dY, ddY;
  const { windowSize, polynomial } = sgOptions;

  if (equalSpaced) {
    if (smoothY) {
      yData = SG(y, x[1] - x[0], {
        windowSize,
        polynomial,
        derivative: 0,
      });
    }
    dY = SG(y, x[1] - x[0], {
      windowSize,
      polynomial,
      derivative: 1,
    });
    ddY = SG(y, x[1] - x[0], {
      windowSize,
      polynomial,
      derivative: 2,
    });
  } else {
    if (smoothY) {
      yData = SG(y, x, {
        windowSize,
        polynomial,
        derivative: 0,
      });
    }
    dY = SG(y, x, {
      windowSize,
      polynomial,
      derivative: 1,
    });
    ddY = SG(y, x, {
      windowSize,
      polynomial,
      derivative: 2,
    });
  }

  const xData = x;
  const dX = x[1] - x[0];
  let maxDdy = 0;
  let maxY = 0;
  for (let i = 0; i < yData.length; i++) {
    if (Math.abs(ddY[i]) > maxDdy) {
      maxDdy = Math.abs(ddY[i]);
    }
    if (Math.abs(yData[i]) > maxY) {
      maxY = Math.abs(yData[i]);
    }
  }

  let lastMax = null;
  let lastMin = null;
  let minddY = [];
  let intervalL = [];
  let intervalR = [];
  let broadMask = [];

  // By the intermediate value theorem We cannot find 2 consecutive maximum or minimum
  for (let i = 1; i < yData.length - 1; ++i) {
    // filter based on derivativeThreshold
    if (Math.abs(dY[i]) > derivativeThreshold) {
      // Minimum in first derivative
      if (
        (dY[i] < dY[i - 1] && dY[i] <= dY[i + 1]) ||
        (dY[i] <= dY[i - 1] && dY[i] < dY[i + 1])
      ) {
        lastMin = {
          x: xData[i],
          index: i,
        };
        if (dX > 0 && lastMax !== null) {
          intervalL.push(lastMax);
          intervalR.push(lastMin);
        }
      }

      // Maximum in first derivative
      if (
        (dY[i] >= dY[i - 1] && dY[i] > dY[i + 1]) ||
        (dY[i] > dY[i - 1] && dY[i] >= dY[i + 1])
      ) {
        lastMax = {
          x: xData[i],
          index: i,
        };
        if (dX < 0 && lastMin !== null) {
          intervalL.push(lastMax);
          intervalR.push(lastMin);
        }
      }
    }

    // Minimum in second derivative
    if (ddY[i] < ddY[i - 1] && ddY[i] < ddY[i + 1]) {
      minddY.push(i);
      broadMask.push(Math.abs(ddY[i]) <= broadRatio * maxDdy);
    }
  }

  let widthProcessor = shape.kind
    ? getShape1D(shape.kind, shape.options).widthToFWHM
    : (x) => x;

  let signals = [];
  let lastK = -1;
  let possible, frequency, distanceJ, minDistance, gettingCloser;
  for (let j = 0; j < minddY.length; ++j) {
    frequency = xData[minddY[j]];
    possible = -1;
    let k = lastK + 1;
    minDistance = Number.MAX_VALUE;
    distanceJ = 0;
    gettingCloser = true;
    while (possible === -1 && k < intervalL.length && gettingCloser) {
      distanceJ = Math.abs(frequency - (intervalL[k].x + intervalR[k].x) / 2);

      // Still getting closer?
      if (distanceJ < minDistance) {
        minDistance = distanceJ;
      } else {
        gettingCloser = false;
      }
      if (distanceJ < Math.abs(intervalL[k].x - intervalR[k].x) / 2) {
        possible = k;
        lastK = k;
      }
      ++k;
    }

    if (possible !== -1) {
      if (Math.abs(yData[minddY[j]]) > minMaxRatio * maxY) {
        let width = Math.abs(intervalR[possible].x - intervalL[possible].x);
        signals.push({
          index: minddY[j],
          x: frequency,
          y: maxCriteria
            ? yData[minddY[j]] + noiseLevel
            : -yData[minddY[j]] - noiseLevel,
          width: widthProcessor(width),
          soft: broadMask[j],
        });

        signals[signals.length - 1].left = intervalL[possible];
        signals[signals.length - 1].right = intervalR[possible];

        if (heightFactor) {
          let yLeft = yData[intervalL[possible].index];
          let yRight = yData[intervalR[possible].index];
          signals[signals.length - 1].height =
            heightFactor *
            (signals[signals.length - 1].y - (yLeft + yRight) / 2);
        }
      }
    }
  }

  if (realTopDetection) {
    determineRealTop(signals, xData, yData);
  }

  // Correct the values to fit the original spectra data
  for (let j = 0; j < signals.length; j++) {
    signals[j].base = noiseLevel;
  }

  signals.sort((a, b) => {
    return a.x - b.x;
  });

  return signals;
}

const isEqualSpaced = (x) => {
  let tmp;
  let maxDx = 0;
  let minDx = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < x.length - 1; ++i) {
    tmp = Math.abs(x[i + 1] - x[i]);
    if (tmp < minDx) {
      minDx = tmp;
    }
    if (tmp > maxDx) {
      maxDx = tmp;
    }
  }
  return (maxDx - minDx) / maxDx < 0.05;
};

const getNoiseLevel = (y) => {
  let mean = 0;

  let stddev = 0;
  let length = y.length;
  for (let i = 0; i < length; ++i) {
    mean += y[i];
  }
  mean /= length;
  let averageDeviations = new Array(length);
  for (let i = 0; i < length; ++i) {
    averageDeviations[i] = Math.abs(y[i] - mean);
  }
  averageDeviations.sort((a, b) => a - b);
  if (length % 2 === 1) {
    stddev = averageDeviations[(length - 1) / 2] / 0.6745;
  } else {
    stddev =
      (0.5 *
        (averageDeviations[length / 2] + averageDeviations[length / 2 - 1])) /
      0.6745;
  }

  return stddev;
};

const determineRealTop = (peakList, x, y) => {
  let alpha, beta, gamma, p, currentPoint;
  for (let j = 0; j < peakList.length; j++) {
    currentPoint = peakList[j].index; // peakList[j][2];
    // The detected peak could be moved 1 or 2 units to left or right.
    if (
      y[currentPoint - 1] >= y[currentPoint - 2] &&
      y[currentPoint - 1] >= y[currentPoint]
    ) {
      currentPoint--;
    } else {
      if (
        y[currentPoint + 1] >= y[currentPoint] &&
        y[currentPoint + 1] >= y[currentPoint + 2]
      ) {
        currentPoint++;
      } else {
        if (
          y[currentPoint - 2] >= y[currentPoint - 3] &&
          y[currentPoint - 2] >= y[currentPoint - 1]
        ) {
          currentPoint -= 2;
        } else {
          if (
            y[currentPoint + 2] >= y[currentPoint + 1] &&
            y[currentPoint + 2] >= y[currentPoint + 3]
          ) {
            currentPoint += 2;
          }
        }
      }
    }
    // interpolation to a sin() function
    if (
      y[currentPoint - 1] > 0 &&
      y[currentPoint + 1] > 0 &&
      y[currentPoint] >= y[currentPoint - 1] &&
      y[currentPoint] >= y[currentPoint + 1] &&
      (y[currentPoint] !== y[currentPoint - 1] ||
        y[currentPoint] !== y[currentPoint + 1])
    ) {
      alpha = 20 * Math.log10(y[currentPoint - 1]);
      beta = 20 * Math.log10(y[currentPoint]);
      gamma = 20 * Math.log10(y[currentPoint + 1]);
      p = (0.5 * (alpha - gamma)) / (alpha - 2 * beta + gamma);
      // console.log(alpha, beta, gamma, `p: ${p}`);
      // console.log(x[currentPoint]+" "+tmp+" "+currentPoint);
      peakList[j].x =
        x[currentPoint] + (x[currentPoint] - x[currentPoint - 1]) * p;
      peakList[j].y =
        y[currentPoint] -
        0.25 * (y[currentPoint - 1] - y[currentPoint + 1]) * p;
    }
  }
};
