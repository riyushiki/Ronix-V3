import getZones from './getZones';

/**
 * Filter an array x/y based on various criteria
 * x points are expected to be sorted
 *
 * @param {object} points
 * @param {object} [options={}]
 * @param {array} [options.from]
 * @param {array} [options.to]
 * @param {array} [options.exclusions=[]]
 * @return {{x: Array<number>, y: Array<number>}}
 */

export default function filterX(points, options = {}) {
  const { x, y } = points;
  const { from = x[0], to = x[x.length - 1], exclusions = [] } = options;

  let zones = getZones(from, to, exclusions);

  let currentZoneIndex = 0;
  let newX = [];
  let newY = [];
  let position = 0;
  while (position < x.length) {
    if (
      x[position] <= zones[currentZoneIndex].to &&
      x[position] >= zones[currentZoneIndex].from
    ) {
      newX.push(x[position]);
      newY.push(y[position]);
    } else {
      if (x[position] > zones[currentZoneIndex].to) {
        currentZoneIndex++;
        if (!zones[currentZoneIndex]) break;
      }
    }
    position++;
  }

  return {
    x: newX,
    y: newY,
  };
}
