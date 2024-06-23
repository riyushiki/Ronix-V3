/**
 * This function xSubtract the first array by the second array or a constant value from each element of the first array
 * @param {Array<Number>} array1 - the array that will be rotated
 * @return {object}
 */
export function xBoxPlot(array) {
  array = array.slice(0).sort((a, b) => a - b);
  if (array.length < 5) {
    throw Error(
      'xBoxPlot: can not calculate info if array contains less than 3 elements',
    );
  }
  let info = {
    Q1: 0.0,
    Q2: 0.0,
    Q3: 0.0,
    min: array[0],
    max: array[array.length - 1],
  };
  let q1max, q3min;
  if (array.length % 2 === 1) {
    // odd
    let middle = (array.length - 1) / 2;
    info.Q2 = array[middle];
    q1max = middle - 1;
    q3min = middle + 1;
  } else {
    // even
    q3min = array.length / 2;
    q1max = q3min - 1;
    info.Q2 = (array[q1max] + array[q3min]) / 2;
  }
  if (q1max % 2 === 0) {
    info.Q1 = array[q1max / 2];
    info.Q3 = array[(array.length + q3min - 1) / 2];
  } else {
    info.Q1 = (array[(q1max + 1) / 2] + array[(q1max - 1) / 2]) / 2;
    let middleOver = (array.length + q3min) / 2;
    info.Q3 = (array[middleOver] + array[middleOver - 1]) / 2;
  }
  return info;
}
