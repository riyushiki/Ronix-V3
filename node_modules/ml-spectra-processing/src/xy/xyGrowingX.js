/**
 * Order object of array, x has to be monotone.
 * Ensure x is growing
 * @param {DataXY} data Object of kind {x:[], y:[]}.
 * @return {SD}
 */

export function xyGrowingX(data) {
  const { x, y } = data;

  if (x.length !== y.length) {
    throw TypeError('sortX: length of x and y must be identical');
  }

  if (x.length < 2 || x[0] < x[1]) return data;

  return {
    x: x.slice(0).reverse(),
    y: y.slice(0).reverse(),
  };
}
