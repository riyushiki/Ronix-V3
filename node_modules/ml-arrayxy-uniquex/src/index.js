/**
 * In place modification of the 2 arrays to make X unique and sum the Y if X has the same value
 * @param {object} [points={}] : Object of points contains property x (an array) and y (an array)
 * @return points
 */

export default function uniqueX(points = {}) {
  const { x, y } = points;
  if (x.length < 2) return;
  if (x.length !== y.length) {
    throw new Error('The X and Y arrays mush have the same length');
  }

  let current = x[0];
  let counter = 0;

  for (let i = 1; i < x.length; i++) {
    if (current !== x[i]) {
      counter++;
      current = x[i];
      x[counter] = x[i];
      if (i !== counter) {
        y[counter] = 0;
      }
    }
    if (i !== counter) {
      y[counter] += y[i];
    }
  }

  x.length = counter + 1;
  y.length = counter + 1;
}
