/**
 *
 * @param {ArrayPoints} [points] array of points {x,y}
 */
export function xyObjectToXY(points) {
  return {
    x: points.map((entry) => entry.x),
    y: points.map((entry) => entry.y),
  };
}
