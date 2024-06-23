import isAnyArray from 'is-any-array';

/**
 * Throw an error in no an object of x,y arrays
 * @param {DataXY} [data={}]
 */
export function xyCheck(data = {}) {
  if (!isAnyArray(data.x) || !isAnyArray(data.y)) {
    throw new Error('Data must be an object of x and y arrays');
  }
  if (data.x.length !== data.y.length) {
    throw new Error('The x and y arrays mush have the same length');
  }
}
