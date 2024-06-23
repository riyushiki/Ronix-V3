import isAnyArray from 'is-any-array';
/**
 * This function xMultiply the first array by the second array or a constant value to each element of the first array
 * @param {Array} array1 - the array that will be rotated
 * @param {Array|Number} array2
 * @return {Float64Array}
 */
export function xMultiply(array1, array2) {
  let isConstant = false;
  let constant;
  if (isAnyArray(array2)) {
    if (array1.length !== array2.length) {
      throw new Error('sub: size of array1 and array2 must be identical');
    }
  } else {
    isConstant = true;
    constant = Number(array2);
  }

  let array3 = new Float64Array(array1.length);
  if (isConstant) {
    for (let i = 0; i < array1.length; i++) {
      array3[i] = array1[i] * constant;
    }
  } else {
    for (let i = 0; i < array1.length; i++) {
      array3[i] = array1[i] * array2[i];
    }
  }

  return array3;
}
