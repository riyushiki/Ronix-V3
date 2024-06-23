/**
 *
 * @param {ArrayPoints} [points] array of growing points {x,y}
 * @param {object} [options={}]
 * @param {object} [slotWidth=1] limit to join the data
 */
export function xyObjectSlotX(points, options = {}) {
  const { slotWidth = 1 } = options;
  const halfSlot = slotWidth / 2;

  // when we join we will use the center of mass
  let result = [];
  let current = {
    x: Number.MIN_VALUE,
    y: 0,
  };
  for (let point of points) {
    let slot = point.x - ((point.x + halfSlot) % slotWidth) + halfSlot;
    if (Math.abs(current.x - slot) > Number.EPSILON) {
      current = {
        x: slot,
        y: 0,
      };
      result.push(current);
    }
    current.y += point.y;
  }
  return result;
}
