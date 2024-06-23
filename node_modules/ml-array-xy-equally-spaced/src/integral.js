/**
 * Function that calculates the integral of the line between two
 * x-coordinates, given the slope and intercept of the line.
 * @param {number} x0
 * @param {number} x1
 * @param {number} slope
 * @param {number} intercept
 * @return {number} integral value.
 */
export default function integral(x0, x1, slope, intercept) {
  return (
    0.5 * slope * x1 * x1 +
    intercept * x1 -
    (0.5 * slope * x0 * x0 + intercept * x0)
  );
}
