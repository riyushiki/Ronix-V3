/**
 * Create an array with sequential numbers between from and to of length
 * @param {number} [options.from=0]
 * @param {number} [options.to=1]
 * @param {number} [options.length=1001]
 */
export function createSequentialArray(options = {}) {
  const { from = 0, to = 1, length = 1000 } = options;
  const array = new Float64Array(length);
  let step = (to - from) / (array.length - 1);
  for (let i = 0; i < array.length; i++) {
    array[i] = from + step * i;
  }
  return array;
}
