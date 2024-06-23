/**
 * function that retrieves the getEquallySpacedData with the variant "slot"
 *
 * @param {Array<number>} x
 * @param {Array<number>} y
 * @param {number} from - Initial point
 * @param {number} to - Final point
 * @param {number} numberOfPoints
 * @return {Array} - Array of y's equally spaced with the variant "slot"
 */
export default function equallySpacedSlot(x, y, from, to, numberOfPoints) {
  let xLength = x.length;

  let step = (to - from) / (numberOfPoints > 1 ? numberOfPoints - 1 : 1);
  let halfStep = step / 2;
  let lastStep = x[x.length - 1] - x[x.length - 2];

  let start = from - halfStep;
  let output = new Array(numberOfPoints);

  // Init main variables
  let min = start;
  let max = start + step;

  let previousX = -Number.MAX_VALUE;
  let previousY = 0;
  let nextX = x[0];
  let nextY = y[0];
  let frontOutsideSpectra = 0;
  let backOutsideSpectra = true;

  let currentValue = 0;

  // for slot algorithm
  let currentPoints = 0;

  let i = 1; // index of input
  let j = 0; // index of output

  main: while (true) {
    if (previousX >= nextX) throw new Error('x must be a growing series');
    while (previousX - max > 0) {
      // no overlap with original point, just consume current value
      if (backOutsideSpectra) {
        currentPoints++;
        backOutsideSpectra = false;
      }

      output[j] = currentPoints <= 0 ? 0 : currentValue / currentPoints;
      j++;

      if (j === numberOfPoints) {
        break main;
      }

      min = max;
      max += step;
      currentValue = 0;
      currentPoints = 0;
    }

    if (previousX > min) {
      currentValue += previousY;
      currentPoints++;
    }

    if (previousX === -Number.MAX_VALUE || frontOutsideSpectra > 1) {
      currentPoints--;
    }

    previousX = nextX;
    previousY = nextY;

    if (i < xLength) {
      nextX = x[i];
      nextY = y[i];
      i++;
    } else {
      nextX += lastStep;
      nextY = 0;
      frontOutsideSpectra++;
    }
  }

  return output;
}
