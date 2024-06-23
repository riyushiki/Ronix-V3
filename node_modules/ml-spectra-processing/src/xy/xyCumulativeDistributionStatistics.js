import max from 'ml-array-max';

import { xCumulative } from '../x/xCumulative';

import { xyCheck } from './xyCheck';
import { xyMaxYPoint } from './xyMaxYPoint';
/**
 * Cumulative Distribution Statistics
 * @param {DataXY} [data] array of points {x,y}
 * @returns {object} x0, x25, x50, x75, x100, mode (x for maxY)
 */

const STEPS = [0.25, 0.5, 0.75];

export function xyCumulativeDistributionStatistics(data) {
  xyCheck(data);
  const { x, y } = data;
  if (x.length === 0) {
    throw new Error(
      'xyCumulativeDistributionStatistics: Array length must be greater than 0',
    );
  }
  const cumulativeSum = xCumulative(y);
  const maxY = max(cumulativeSum);
  for (let i = 0; i < cumulativeSum.length; i++) {
    cumulativeSum[i] /= maxY;
  }

  const result = {};

  // need to find the x values closest to STEPS/100
  result.x0 = x[0];
  result.x100 = x[x.length - 1];

  let currentStep = 0;
  breakPoint: for (let i = 1; i < cumulativeSum.length; i++) {
    while (STEPS[currentStep] < cumulativeSum[i]) {
      result[`x${STEPS[currentStep] * 100}`] =
        x[i - 1] +
        (x[i] - x[i - 1]) *
          ((STEPS[currentStep] - cumulativeSum[i - 1]) /
            (cumulativeSum[i] - cumulativeSum[i - 1]));
      currentStep++;
      if (currentStep === STEPS.length) break breakPoint;
    }
  }
  result.xMode = xyMaxYPoint(data).x;

  let sumXY = 0;
  let sumY = 0;
  for (let i = 0; i < x.length; i++) {
    sumXY += x[i] * y[i];
    sumY += y[i];
  }
  result.xMean = sumXY / sumY;

  return result;
}
