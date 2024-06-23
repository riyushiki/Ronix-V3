import { xFindClosestIndex } from '../x/xFindClosestIndex';
import { zonesNormalize } from '../zones/zonesNormalize';

import { xyCheck } from './xyCheck';
/**
 * xyReduce the number of points while keeping visually the same noise. Practical to
 * display many spectra as SVG.
 * SHOULD NOT BE USED FOR DATA PROCESSING !!!
 * You should rather use ml-xy-equally-spaced to make further processing
 * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.from=x[0]]
 * @param {number} [options.to=x[x.length-1]]
 * @param {number} [options.nbPoints=4001] Number of points
 * @param {number} [options.zones=[]] Array of zones to keep (from/to object)
 * @param {number} [options.optimize=false] If optimize we may have less than nbPoints at the end
 */

export function xyReduce(data, options = {}) {
  xyCheck(data);
  const { x, y } = data;
  let {
    from = x[0],
    to = x[x.length - 1],
    nbPoints = 4001,
    optimize = false,
    zones = [],
  } = options;

  zones = zonesNormalize(zones, { from, to });
  if (zones.length === 0) zones = [{ from, to }]; // we take everything

  // for each zone we should know the first index, the last index and the number of points

  let totalPoints = 0;
  for (let zone of zones) {
    zone.fromIndex = xFindClosestIndex(x, zone.from);
    zone.toIndex = xFindClosestIndex(x, zone.to);
    if (zone.fromIndex > 0 && x[zone.fromIndex] > zone.from) {
      zone.fromIndex--;
    }
    if (zone.toIndex < x.length - 1 && x[zone.toIndex] < zone.to) {
      zone.toIndex++;
    }

    zone.nbPoints = zone.toIndex - zone.fromIndex + 1;
    totalPoints += zone.nbPoints;
  }
  // we calculate the number of points per zone that we should keep
  if (totalPoints > nbPoints) {
    // need to xyReduce number of points
    let ratio = nbPoints / totalPoints;
    let currentTotal = 0;
    for (let i = 0; i < zones.length - 1; i++) {
      const zone = zones[i];
      zone.nbPoints = Math.round(zone.nbPoints * ratio);
      currentTotal += zone.nbPoints;
    }
    zones[zones.length - 1].nbPoints = nbPoints - currentTotal;
  } else {
    let newX = new Float64Array(totalPoints);
    let newY = new Float64Array(totalPoints);
    let index = 0;
    for (let zone of zones) {
      for (let i = zone.fromIndex; i < zone.toIndex + 1; i++) {
        newX[index] = x[i];
        newY[index] = y[i];
        index++;
      }
    }
    return {
      x: newX,
      y: newY,
    };
  }

  let newX = [];
  let newY = [];
  for (let zone of zones) {
    if (!zone.nbPoints) continue;
    appendFromTo(zone.fromIndex, zone.toIndex, zone.nbPoints);
  }
  return { x: newX, y: newY };

  function appendFromTo(fromIndex, toIndex, zoneNbPoints) {
    if (zoneNbPoints === 1) {
      newX.push(x[Math.round((toIndex - fromIndex) / 2)]);
      newY.push(y[Math.round((toIndex - fromIndex) / 2)]);
      return;
    }
    if (zoneNbPoints === 2) {
      newX.push(x[fromIndex], x[toIndex]);
      newY.push(y[fromIndex], y[toIndex]);
      return;
    }
    newX.push(x[fromIndex]);
    newY.push(y[fromIndex]);
    let minY = Number.MAX_VALUE;
    let xyMaxY = Number.MIN_VALUE;
    if (zoneNbPoints % 2 === 0) {
      zoneNbPoints = zoneNbPoints / 2 + 1;
    } else {
      zoneNbPoints = (zoneNbPoints - 1) / 2 + 1;
    }

    // we will need to make some kind of min / max because there are too many points
    // we will always keep the first point and the last point
    let slot = (x[toIndex] - x[fromIndex]) / (zoneNbPoints - 1);
    let currentX = x[fromIndex] + slot;
    let first = true;
    for (let i = fromIndex + 1; i <= toIndex; i++) {
      if (first) {
        minY = y[i];
        xyMaxY = y[i];
        first = false;
      } else {
        if (y[i] < minY) minY = y[i];
        if (y[i] > xyMaxY) xyMaxY = y[i];
      }
      if (x[i] >= currentX || i === toIndex) {
        if (optimize) {
          if (minY > newY[newX.length - 1]) {
            // we can skip the intermediate value
          } else if (xyMaxY < newY[newX.length - 1]) {
            // we can skip the intermediate value
            xyMaxY = minY;
          } else {
            newX.push(currentX - slot / 2);
            newY.push(minY);
          }
        } else {
          newX.push(currentX - slot / 2);
          newY.push(minY);
        }

        newX.push(currentX);
        newY.push(xyMaxY);

        currentX += slot;
        first = true;
      }
    }
  }
}
