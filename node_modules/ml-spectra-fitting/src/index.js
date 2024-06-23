import { checkInput } from './checkInput';
import { selectMethod } from './selectMethod';

// const STATE_INIT = 0;
// const STATE_MIN = 1;
// const STATE_MAX = 2;
// const STATE_GRADIENT_DIFFERENCE = 3;

// const X = 0;
// const Y = 1;
// const WIDTH = 2;
// const MU = 3;

// const keys = ['x', 'y', 'width', 'mu'];
/**
 * Fits a set of points to the sum of a set of bell functions.
 * @param {object} data - An object containing the x and y data to be fitted.
 * @param {array} peaks - A list of initial parameters to be optimized. e.g. coming from a peak picking [{x, y, width}].
 * @param {object} [options = {}]
 * @param {object} [options.shape={}] - it's specify the kind of shape used to fitting.
 * @param {string} [options.shape.kind = 'gaussian'] - kind of shape; lorentzian, gaussian and pseudovoigt are supported.
 * @param {object} [options.optimization = {}] - it's specify the kind and options of the algorithm use to optimize parameters.
 * @param {object} [options.optimization.kind = 'lm'] - kind of algorithm. By default it's levenberg-marquardt.
 * @param {object} [options.optimization.parameters] - options of each parameter to be optimized e.g. For a gaussian shape
 *  it could have x, y and with properties, each of which could contain init, min, max and gradientDifference, those options will define the guess,
 *  the min and max value of the parameter (search space) and the step size to approximate the jacobian matrix respectively. Those options could be a number,
 *  array of numbers, callback, or array of callbacks. Each kind of shape has default parameters so it could be undefined.
 * @param {object} [options.optimization.parameters.x] - options for x parameter.
 * @param {number|callback|array<number|callback>} [options.optimization.parameters.x.init] - definition of the starting point of the parameter (the guess),
 *  if it is a callback the method pass the peak as the unique input, if it is an array the first element define the guess of the first peak and so on.
 * @param {number|callback|array<number|callback>} [options.optimization.parameters.x.min] - definition of the lower limit of the parameter,
 *  if it is a callback the method pass the peak as the unique input, if it is an array the first element define the min of the first peak and so on.
 * @param {number|callback|array<number|callback>} [options.optimization.parameters.x.max] - definition of the upper limit of the parameter,
 *  if it is a callback the method pass the peak as the unique input, if it is an array the first element define the max of the first peak and so on.
 * @param {number|callback|array<number|callback>} [options.optimization.parameters.x.gradientDifference] - definition of  the step size to approximate the jacobian matrix of the parameter,
 *  if it is a callback the method pass the peak as the unique input, if it is an array the first element define the gradientDifference of the first peak and so on.
 * @param {object} [options.optimization.options = {}] - options for the specific kind of algorithm.
 * @param {number} [options.optimization.options.timeout] - maximum time running before break in seconds.
 * @param {number} [options.optimization.options.damping=1.5]
 * @param {number} [options.optimization.options.maxIterations=100]
 * @param {number} [options.optimization.options.errorTolerance=1e-8]
 * @returns {object} - A object with fitting error and the list of optimized parameters { parameters: [ {x, y, width} ], error } if the kind of shape is pseudoVoigt mu parameter is optimized.
 */
export function optimize(data, peakList, options = {}) {
  const { y, x, maxY, peaks, paramsFunc, optimization } = checkInput(
    data,
    peakList,
    options,
  );

  let parameters = optimization.parameters;

  let nbShapes = peaks.length;
  let parameterKey = Object.keys(parameters);
  let nbParams = nbShapes * parameterKey.length;
  let pMin = new Float64Array(nbParams);
  let pMax = new Float64Array(nbParams);
  let pInit = new Float64Array(nbParams);
  let gradientDifference = new Float64Array(nbParams);

  for (let i = 0; i < nbShapes; i++) {
    let peak = peaks[i];
    for (let k = 0; k < parameterKey.length; k++) {
      let key = parameterKey[k];
      let init = parameters[key].init;
      let min = parameters[key].min;
      let max = parameters[key].max;
      let gradientDifferenceValue = parameters[key].gradientDifference;
      pInit[i + k * nbShapes] = init[i % init.length](peak);
      pMin[i + k * nbShapes] = min[i % min.length](peak);
      pMax[i + k * nbShapes] = max[i % max.length](peak);
      gradientDifference[i + k * nbShapes] = gradientDifferenceValue[
        i % gradientDifferenceValue.length
      ](peak);
    }
  }

  let { algorithm, optimizationOptions } = selectMethod(optimization);

  optimizationOptions.minValues = pMin;
  optimizationOptions.maxValues = pMax;
  optimizationOptions.initialValues = pInit;
  optimizationOptions.gradientDifference = gradientDifference;

  let pFit = algorithm({ x, y }, paramsFunc, optimizationOptions);

  let { parameterError: error, iterations } = pFit;
  let result = { error, iterations, peaks };
  for (let i = 0; i < nbShapes; i++) {
    pFit.parameterValues[i + nbShapes] *= maxY;
    for (let k = 0; k < parameterKey.length; k++) {
      // we modify the optimized parameters
      peaks[i][parameterKey[k]] = pFit.parameterValues[i + k * nbShapes];
    }
  }

  return result;
}
