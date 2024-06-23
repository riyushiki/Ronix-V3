/**
 * This function make a zero filling to re and im part.
 * @param {object} data Object of kind {x:[], re:[], im:[]}.
 * @param {number} totalLength - final number of points
 * @return {SD}
 */
export function xreimZeroFilling(data, totalLength) {
  let length = data.x.length;
  if (totalLength === 0 || length === totalLength) return data;

  if (length > totalLength) {
    return {
      x: data.x.slice(0, totalLength),
      re: data.re.slice(0, totalLength),
      im: data.im.slice(0, totalLength),
    };
  }

  const x = data.x;
  const re = data.re;
  const im = data.im;

  const newX = new Float64Array(totalLength);
  const newRE = new Float64Array(totalLength);
  const newIM = new Float64Array(totalLength);

  for (let i = 0; i < length; i++) {
    newX[i] = x[i];
    newRE[i] = re[i];
    newIM[i] = im[i];
  }
  const deltaX = (x[x.length - 1] - x[0]) / (length - 1);
  for (let i = length; i < totalLength; i++) {
    newX[i] = newX[i - 1] + deltaX;
  }

  return {
    x: newX,
    re: newRE,
    im: newIM,
  };
}
