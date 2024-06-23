/**
 * Sort object of array, x has to be monotone.
 * @param {object} data Object of kind {x:[], re:[], im:[]}.
 * @return {SD}
 */

export function xreimSortX(data) {
  const { x, re, im } = data;

  if (x.length !== re.length || x.length !== im.length) {
    throw TypeError('xreimSortX: length of x, re and im must be identical');
  }

  if (x.length < 2 || x[0] < x[1]) return data;

  return {
    x: x.slice(0).reverse(),
    re: re.slice(0).reverse(),
    im: im.slice(0).reverse(),
  };
}
