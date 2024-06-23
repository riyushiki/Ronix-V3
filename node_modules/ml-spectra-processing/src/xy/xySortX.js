import { xIsMonotone } from '../x/xIsMonotone';
/**
import { xIsMonotone } from '../x/xIsMonotone';
 * This function performs a quick sort of the x array while transforming the y array to preserve the coordinates.
 * @param {DataXY} [data] Object that contains property x (Array) and y (Array)
 */
export function xySortX(data) {
  const { x, y } = data;

  // no need to sort if it is already sorted
  if (xIsMonotone(x) && x.length > 1) {
    if (x[0] < x[1]) {
      return {
        x: Float64Array.from(x),
        y: Float64Array.from(y),
      };
    } else {
      return {
        x: Float64Array.from(x).reverse(),
        y: Float64Array.from(y).reverse(),
      };
    }
  }

  let xyObject = x
    .map((val, index) => ({
      x: val,
      y: y[index],
    }))
    .sort((a, b) => a.x - b.x);

  let response = {
    x: new Float64Array(x.length),
    y: new Float64Array(y.length),
  };
  for (let i = 0; i < x.length; i++) {
    response.x[i] = xyObject[i].x;
    response.y[i] = xyObject[i].y;
  }

  return response;
}
