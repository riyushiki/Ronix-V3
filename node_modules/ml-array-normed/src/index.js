import { isAnyArray } from 'is-any-array';
import max from 'ml-array-max';
import sum from 'ml-array-sum';

export default function norm(input, options = {}) {
  const { algorithm = 'absolute', sumValue = 1, maxValue = 1 } = options;
  if (!isAnyArray(input)) {
    throw new Error('input must be an array');
  }

  let output;
  if (options.output !== undefined) {
    if (!isAnyArray(options.output)) {
      throw new TypeError('output option must be an array if specified');
    }
    output = options.output;
  } else {
    output = new Array(input.length);
  }

  if (input.length === 0) {
    throw new Error('input must not be empty');
  }

  switch (algorithm.toLowerCase()) {
    case 'absolute': {
      let absoluteSumValue = absoluteSum(input) / sumValue;
      if (absoluteSumValue === 0) return input.slice(0);
      for (let i = 0; i < input.length; i++) {
        output[i] = input[i] / absoluteSumValue;
      }
      return output;
    }
    case 'max': {
      let currentMaxValue = max(input);
      if (currentMaxValue === 0) return input.slice(0);
      const factor = maxValue / currentMaxValue;
      for (let i = 0; i < input.length; i++) {
        output[i] = input[i] * factor;
      }
      return output;
    }
    case 'sum': {
      let sumFactor = sum(input) / sumValue;
      if (sumFactor === 0) return input.slice(0);
      for (let i = 0; i < input.length; i++) {
        output[i] = input[i] / sumFactor;
      }
      return output;
    }
    default:
      throw new Error(`norm: unknown algorithm: ${algorithm}`);
  }
}

function absoluteSum(input) {
  let sumValue = 0;
  for (let i = 0; i < input.length; i++) {
    sumValue += Math.abs(input[i]);
  }
  return sumValue;
}
