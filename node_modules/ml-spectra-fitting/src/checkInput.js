import assignDeep from 'assign-deep';
import getMaxValue from 'ml-array-max';

import { sumOfGaussianLorentzians } from './shapes/sumOfGaussianLorentzians';
import { sumOfGaussians } from './shapes/sumOfGaussians';
import { sumOfLorentzians } from './shapes/sumOfLorentzians';

export function checkInput(data, peaks, options) {
  let {
    shape = { kind: 'gaussian' },
    optimization = {
      kind: 'lm',
    },
  } = options;

  if (typeof shape.kind !== 'string') {
    throw new Error('kind should be a string');
  }

  let kind = shape.kind.toLowerCase().replace(/[^a-z]/g, '');

  let paramsFunc;
  let defaultParameters;
  switch (kind) {
    case 'gaussian':
      paramsFunc = sumOfGaussians;
      defaultParameters = {
        x: {
          init: (peak) => peak.x,
          max: (peak) => peak.x + peak.width * 2,
          min: (peak) => peak.x - peak.width * 2,
          gradientDifference: (peak) => peak.width * 2e-3,
        },
        y: {
          init: (peak) => peak.y,
          max: () => 1.5,
          min: () => 0,
          gradientDifference: () => 1e-3,
        },
        width: {
          init: (peak) => peak.width,
          max: (peak) => peak.width * 4,
          min: (peak) => peak.width * 0.25,
          gradientDifference: (peak) => peak.width * 2e-3,
        },
      };
      break;
    case 'lorentzian':
      paramsFunc = sumOfLorentzians;
      defaultParameters = {
        x: {
          init: (peak) => peak.x,
          max: (peak) => peak.x + peak.width * 2,
          min: (peak) => peak.x - peak.width * 2,
          gradientDifference: (peak) => peak.width * 2e-3,
        },
        y: {
          init: (peak) => peak.y,
          max: () => 1.5,
          min: () => 0,
          gradientDifference: () => 1e-3,
        },
        width: {
          init: (peak) => peak.width,
          max: (peak) => peak.width * 4,
          min: (peak) => peak.width * 0.25,
          gradientDifference: (peak) => peak.width * 2e-3,
        },
      };
      break;
    case 'pseudovoigt':
      paramsFunc = sumOfGaussianLorentzians;
      defaultParameters = {
        x: {
          init: (peak) => peak.x,
          max: (peak) => peak.x + peak.width * 2,
          min: (peak) => peak.x - peak.width * 2,
          gradientDifference: (peak) => peak.width * 2e-3,
        },
        y: {
          init: (peak) => peak.y,
          max: () => 1.5,
          min: () => 0,
          gradientDifference: () => 1e-3,
        },
        width: {
          init: (peak) => peak.width,
          max: (peak) => peak.width * 4,
          min: (peak) => peak.width * 0.25,
          gradientDifference: (peak) => peak.width * 2e-3,
        },
        mu: {
          init: (peak) => (peak.mu !== undefined ? peak.mu : 0.5),
          min: () => 0,
          max: () => 1,
          gradientDifference: () => 0.01,
        },
      };
      break;
    default:
      throw new Error('kind of shape is not supported');
  }

  let x = data.x;
  let maxY = getMaxValue(data.y);
  let y = new Array(x.length);
  for (let i = 0; i < x.length; i++) {
    y[i] = data.y[i] / maxY;
  }

  for (let i = 0; i < peaks.length; i++) {
    peaks[i].y /= maxY;
  }

  let parameters = assignDeep({}, optimization.parameters, defaultParameters);

  for (let key in parameters) {
    for (let par in parameters[key]) {
      if (!Array.isArray(parameters[key][par])) {
        parameters[key][par] = [parameters[key][par]];
      }
      if (
        parameters[key][par].length !== 1 &&
        parameters[key][par].length !== peaks.length
      ) {
        throw new Error(`The length of ${key}-${par} is not correct`);
      }
      for (let index = 0; index < parameters[key][par].length; index++) {
        if (typeof parameters[key][par][index] === 'number') {
          let value = parameters[key][par][index];
          parameters[key][par][index] = () => value;
        }
      }
    }
  }

  optimization.parameters = parameters;

  return {
    y,
    x,
    maxY,
    peaks,
    paramsFunc,
    optimization,
  };
}
