import { normalize } from './normalize';

/**
 * Convert an array of exclusions and keep only from / to
 *
 * The method will always check if from if lower than to and will swap if required.
 * @param {Array} [exclusions=[]]
 * @param {object} [options={}]
 * @param {number} [options.from=Number.NEGATIVE_INFINITY] Specify min value of zones (after inversion)
 * @param {number} [options.to=Number.POSITIVE_INFINITY] Specify max value of zones (after inversion)
 */

export function invert(exclusions = [], options = {}) {
  let {
    from = Number.NEGATIVE_INFINITY,
    to = Number.POSITIVE_INFINITY,
  } = options;
  if (from > to) [from, to] = [to, from];

  exclusions = normalize(exclusions, { from, to });
  if (exclusions.length === 0) return [{ from, to }];

  let zones = [];
  for (let i = 0; i < exclusions.length; i++) {
    let exclusion = exclusions[i];
    let nextExclusion = exclusions[i + 1];
    if (i === 0) {
      if (exclusion.from > from) {
        zones.push({ from, to: exclusion.from });
      }
    }
    if (i === exclusions.length - 1) {
      if (exclusion.to < to) {
        zones.push({ from: exclusion.to, to });
      }
    } else {
      zones.push({ from: exclusion.to, to: nextExclusion.from });
    }
  }

  return zones;
}
