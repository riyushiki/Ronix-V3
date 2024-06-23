import variance from 'ml-array-variance';

export default function standardDeviation(values, options = {}) {
  return Math.sqrt(variance(values, options));
}
