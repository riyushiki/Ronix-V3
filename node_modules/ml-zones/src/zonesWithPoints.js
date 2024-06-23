import { normalize } from './normalize';

/**
 * Add the number of points per zone to reach a specified total
 * @param {Array} [zones=[]]
 * @param {number} [numberOfPoints] Total number of points to distribute between zones
 * @param {object} [options={}]
 * @param {number} [options.from=Number.NEGATIVE_INFINITY] Specify min value of a zone
 * @param {number} [options.to=Number.POSITIVE_INFINITY] Specify max value of a zone
 */

export function zonesWithPoints(zones, numberOfPoints, options = {}) {
  if (zones.length === 0) return zones;
  zones = normalize(zones, options);

  const totalSize = zones.reduce((previous, current) => {
    return previous + (current.to - current.from);
  }, 0);

  let unitsPerPoint = totalSize / numberOfPoints;
  let currentTotal = 0;
  for (let i = 0; i < zones.length - 1; i++) {
    let zone = zones[i];
    zone.numberOfPoints = Math.min(
      Math.round((zone.to - zone.from) / unitsPerPoint),
      numberOfPoints - currentTotal,
    );
    currentTotal += zone.numberOfPoints;
  }

  zones[zones.length - 1].numberOfPoints = numberOfPoints - currentTotal;

  return zones;
}
