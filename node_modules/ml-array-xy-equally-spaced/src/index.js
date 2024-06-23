import sequentialFill from 'ml-array-sequential-fill';
import { zonesWithPoints, invert } from 'ml-zones';

import equallySpacedSlot from './equallySpacedSlot';
import equallySpacedSmooth from './equallySpacedSmooth';

/**
 * Function that returns a Number array of equally spaced numberOfPoints
 * containing a representation of intensities of the spectra arguments x
 * and y.
 *
 * The options parameter contains an object in the following form:
 * from: starting point
 * to: last point
 * numberOfPoints: number of points between from and to
 * variant: "slot" or "smooth" - smooth is the default option
 *
 * The slot variant consist that each point in the new array is calculated
 * averaging the existing points between the slot that belongs to the current
 * value. The smooth variant is the same but takes the integral of the range
 * of the slot and divide by the step size between two points in the new array.
 *
 * If exclusions zone are present, zones are ignored !
 * @param {object} [arrayXY={}] - object containing 2 properties x and y (both an array)
 * @param {object} [options={}]
 * @param {number} [options.from=x[0]]
 * @param {number} [options.to=x[x.length-1]]
 * @param {string} [options.variant='smooth']
 * @param {number} [options.numberOfPoints=100]
 * @param {Array} [options.exclusions=[]] array of from / to that should be skipped for the generation of the points
 * @param {Array} [options.zones=[]] array of from / to that should be kept
 * @return {object<x: Array, y:Array>} new object with x / y array with the equally spaced data.
 */

export default function equallySpaced(arrayXY = {}, options = {}) {
  let { x, y } = arrayXY;
  let xLength = x.length;
  let reverse = false;
  if (x.length > 1 && x[0] > x[1]) {
    x = x.slice().reverse();
    y = y.slice().reverse();
    reverse = true;
  }

  let {
    from = x[0],
    to = x[xLength - 1],
    variant = 'smooth',
    numberOfPoints = 100,
    exclusions = [],
    zones = [],
  } = options;

  if (xLength !== y.length) {
    throw new RangeError("the x and y vector doesn't have the same size.");
  }

  if (typeof from !== 'number' || isNaN(from)) {
    throw new RangeError("'from' option must be a number");
  }

  if (typeof to !== 'number' || isNaN(to)) {
    throw new RangeError("'to' option must be a number");
  }

  if (typeof numberOfPoints !== 'number' || isNaN(numberOfPoints)) {
    throw new RangeError("'numberOfPoints' option must be a number");
  }

  if (numberOfPoints < 2) {
    throw new RangeError("'numberOfPoints' option must be greater than 1");
  }

  if (zones.length === 0) {
    zones = invert(exclusions, { from, to });
  }

  zones = zonesWithPoints(zones, numberOfPoints, { from, to });

  let xResult = [];
  let yResult = [];
  for (let zone of zones) {
    let zoneResult = processZone(
      x,
      y,
      zone.from,
      zone.to,
      zone.numberOfPoints,
      variant,
      reverse,
    );

    xResult = xResult.concat(zoneResult.x);
    yResult = yResult.concat(zoneResult.y);
  }
  if (reverse) {
    if (from < to) {
      return { x: xResult.reverse(), y: yResult.reverse() };
    } else {
      return { x: xResult, y: yResult };
    }
  } else {
    if (from < to) {
      return { x: xResult, y: yResult };
    } else {
      return { x: xResult.reverse(), y: yResult.reverse() };
    }
  }
}

function processZone(x, y, from, to, numberOfPoints, variant) {
  if (numberOfPoints < 1) {
    throw new RangeError('the number of points must be at least 1');
  }
  let output =
    variant === 'slot'
      ? equallySpacedSlot(x, y, from, to, numberOfPoints)
      : equallySpacedSmooth(x, y, from, to, numberOfPoints);

  return {
    x: sequentialFill({
      from,
      to,
      size: numberOfPoints,
    }),
    y: output,
  };
}
