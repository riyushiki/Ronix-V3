/**
 * xyAlign will align data of two spectra by verifying wether x values are in a certain range (`delta`).
 * The two spectra should not have two consecutive x values which difference is
 * smaller than `delta` to achieve good results!
 * @param {DataXY} data1 First spectrum data
 * @param {DataXY} data2 Second spectrum data
 * @param {object} [options={}]
 * @param {number|function} [options.delta=1] The range in which the two x values of the spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
 * @param {boolean} [options.common=true] If `true`, only the data considered as common to both spectra is kept. If `false`, the data y arrays are completed with zeroes where no common values are found
 * @param {string} [options.x='x1'] Defines what x values should be kept (`x1` : spectrum 1 x values, `x2` spectrum 2 x values, `weighted`: weighted average of both spectra x values)
 */
export function xyAlign(data1, data2, options = {}) {
  const { delta = 1, common = true, x = 'x1' } = options;

  let result = {
    x: [],
    y1: [],
    y2: [],
  };

  let i = 0;
  let j = 0;

  let length1 = data1.x.length;
  let length2 = data2.x.length;

  while (i < length1 && j < length2) {
    let maxDiff = 0;

    if (typeof delta === 'function') {
      let mean = (data1.x[i] + data2.x[j]) / 2; // is this a good thing to do?
      maxDiff = delta(mean);
    } else {
      maxDiff = delta;
    }

    let difference = data1.x[i] - data2.x[j];

    if (Math.abs(difference) > maxDiff) {
      if (difference > 0) {
        if (!common) {
          result.x.push(data2.x[j]);
          result.y1.push(0);
          result.y2.push(data2.y[j]);
          if (j === length2 - 1) {
            while (i < length1) {
              result.x.push(data1.x[i]);
              result.y1.push(data1.y[i]);
              result.y2.push(0);
              i++;
            }
          }
        }
        // console.log({ i, j }, result);
        j++;
      } else {
        if (!common) {
          result.x.push(data1.x[i]);
          result.y1.push(data1.y[i]);
          result.y2.push(0);
          if (i === length1 - 1) {
            while (j < length2) {
              result.x.push(data2.x[j]);
              result.y1.push(0);
              result.y2.push(data2.y[j]);
              j++;
            }
          }
        }
        // console.log({ i, j }, result);
        i++;
      }
    } else {
      let weightedX =
        (data1.x[i] * data1.y[i] + data2.x[j] * data2.y[j]) /
        (data1.y[i] + data2.y[j]);

      switch (x) {
        case 'x1':
          result.x.push(data1.x[i]);
          break;
        case 'x2':
          result.x.push(data2.x[j]);
          break;
        case 'weighted':
          result.x.push(weightedX);
          break;
        default:
          throw new Error(`Error: Unknown x option value: ${x}`);
      }

      result.y1.push(data1.y[i]);
      result.y2.push(data2.y[j]);

      // console.log({ i, j }, result);

      i++;
      j++;
    }
  }
  return result;
}
