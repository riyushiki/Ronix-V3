/**
 * Throw an error in no an object of x,y arrays
 * @param {ArrayPoints} [points=[]]
 */
export function xyObjectCheck(points = []) {
  if (!Array.isArray(points)) {
    throw new Error('ArrayPoints must be an array of {x,y} object');
  }
  if (
    points.length > 0 &&
    (points[0].x === undefined || points[0].y === undefined)
  ) {
    throw new Error('ArrayPoints must be an array of {x,y} object');
  }
}
