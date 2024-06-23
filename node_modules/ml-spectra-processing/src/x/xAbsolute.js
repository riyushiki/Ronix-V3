/**
 * This function returns an array with absolute values
 * @param {Array<Number>} array
 * @return {Number}
 */
export function xAbsolute(array) {
  let tmpArray = array.slice();
  for (let i = 0; i < tmpArray.length; i++) {
    if (tmpArray[i] < 0) tmpArray[i] *= -1;
  }

  return tmpArray;
}
