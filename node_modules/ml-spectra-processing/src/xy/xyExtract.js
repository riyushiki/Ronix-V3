import { zonesNormalize } from '../zones/zonesNormalize';

import { xyCheck } from './xyCheck';

/**
 * xyExtract zones from a XY data
 * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {Array} [options.zones=[]]
 * @return {Array} Array of points
 */

export function xyExtract(data = {}, options = {}) {
  xyCheck(data);
  const { x, y } = data;
  let { zones } = options;

  zones = zonesNormalize(zones);

  if (!Array.isArray(zones) || zones.length === 0) return data;

  let newX = [];
  let newY = [];

  let currentZone = zones[0];
  let position = 0;
  loop: for (let i = 0; i < x.length; i++) {
    while (currentZone.to < x[i]) {
      position++;
      currentZone = zones[position];
      if (!currentZone) {
        i = x.length;
        break loop;
      }
    }
    if (x[i] >= currentZone.from) {
      newX.push(x[i]);
      newY.push(y[i]);
    }
  }
  return { x: newX, y: newY };
}
