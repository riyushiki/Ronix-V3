/**
 * Sorts an array of points
 * @param {ArrayPoints} [points] array of points {x,y}
 */

export function xyObjectSortX(points) {
  return points.sort((a, b) => a.x - b.x);
}
