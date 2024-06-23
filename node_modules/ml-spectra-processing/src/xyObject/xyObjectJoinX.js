/**
 *
 * @param {ArrayPoints} [points] array of growing points {x,y}
 * @param {object} [options={}]
 * @param {object} [xError=Number.EPSILON] limit to join the data
 */
export function xyObjectJoinX(points, options = {}) {
  const { xError = Number.EPSILON } = options;

  // when we join we will use the center of mass
  let result = [];
  let current = {
    x: Number.MIN_SAFE_INTEGER,
    y: 0,
  };
  for (let point of points) {
    if (point.x - current.x <= xError) {
      // weighted sum
      if (current.y !== 0 || point.y !== 0) {
        current.x =
          (point.y / (current.y + point.y)) * (point.x - current.x) + current.x;
        current.y += point.y;
      }
    } else {
      current = {
        x: point.x,
        y: point.y,
      };
      result.push(current);
    }
  }
  return result;
}
