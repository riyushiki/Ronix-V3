import { isAnyArray } from 'is-any-array';
import arrayMean from 'ml-array-mean';

export default function variance(values, options = {}) {
  if (!isAnyArray(values)) {
    throw new TypeError('input must be an array');
  }

  const { unbiased = true, mean = arrayMean(values) } = options;
  let sqrError = 0;

  for (let i = 0; i < values.length; i++) {
    let x = values[i] - mean;
    sqrError += x * x;
  }

  if (unbiased) {
    return sqrError / (values.length - 1);
  } else {
    return sqrError / values.length;
  }
}
