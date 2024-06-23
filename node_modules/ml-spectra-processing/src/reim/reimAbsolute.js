/**
 * Calculates reimAbsolute value of a complex spectrum
 * @param {object} [reim] - An object of kind {re:[], im:[]}.
 * @return {Float64Array}
 */
export function reimAbsolute(data) {
  const length = data.re.length;
  const re = data.re;
  const im = data.im;
  const newArray = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    newArray[i] = Math.sqrt(re[i] ** 2 + im[i] ** 2);
  }

  return newArray;
}
