'use strict';

var defaultOptions = {
  size: 1,
  value: 0
};

/**
 * Case when the entry is an array
 * @param data
 * @param options
 * @returns {Array}
 */
function arrayCase(data, options) {
  var len = data.length;
  if (typeof options.size === 'number') {
    options.size = [options.size, options.size];
  }

  var cond = len + options.size[0] + options.size[1];

  var output;
  if (options.output) {
    if (options.output.length !== cond) {
      throw new RangeError('Wrong output size');
    }
    output = options.output;
  } else {
    output = new Array(cond);
  }

  var i;
  if (options.value === 'circular') {
    for (i = 0; i < cond; i++) {
      if (i < options.size[0]) {
        output[i] = data[(len - (options.size[0] % len) + i) % len];
      } else if (i < options.size[0] + len) {
        output[i] = data[i - options.size[0]];
      } else {
        output[i] = data[(i - options.size[0]) % len];
      }
    }
  } else if (options.value === 'replicate') {
    for (i = 0; i < cond; i++) {
      if (i < options.size[0]) output[i] = data[0];
      else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];
      else output[i] = data[len - 1];
    }
  } else if (options.value === 'symmetric') {
    if (options.size[0] > len || options.size[1] > len) {
      throw new RangeError(
        'expanded value should not be bigger than the data length'
      );
    }
    for (i = 0; i < cond; i++) {
      if (i < options.size[0]) output[i] = data[options.size[0] - 1 - i];
      else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];
      else output[i] = data[2 * len + options.size[0] - i - 1];
    }
  } else {
    for (i = 0; i < cond; i++) {
      if (i < options.size[0]) output[i] = options.value;
      else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];
      else output[i] = options.value;
    }
  }

  return output;
}

/**
 * Case when the entry is a matrix
 * @param data
 * @param options
 * @returns {Array}
 */
function matrixCase(data, options) {
  // var row = data.length;
  // var col = data[0].length;
  if (options.size[0] === undefined) {
    options.size = [options.size, options.size, options.size, options.size];
  }
  throw new Error('matrix not supported yet, sorry');
}

/**
 * Pads and array
 * @param {Array <number>} data
 * @param {object} options
 */
function padArray(data, options) {
  options = Object.assign({}, defaultOptions, options);
  if (Array.isArray(data)) {
    if (Array.isArray(data[0])) return matrixCase(data, options);
    else return arrayCase(data, options);
  } else {
    throw new TypeError('data should be an array');
  }
}

module.exports = padArray;
