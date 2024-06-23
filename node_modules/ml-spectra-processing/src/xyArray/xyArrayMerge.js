import { xyJoinX } from '../xy/xyJoinX';

import { getSlots } from './utils/getSlots';
/**
 * Merge DataXY
 * We have an array of DataXY and the goal is to merge all the values that are the closest possible
 * @param {Array<DataXY>} spectra
 * @param {object} [options={}]
 * @param {number|function} [options.delta=1] The range in which the two x values of the spectra must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
 */
export function xyArrayMerge(spectra, options = {}) {
  const { delta = 1 } = options;
  // we start by checking that the spectra don't have peaks too close and we simplify them
  spectra = spectra.map((spectrum) => xyJoinX(spectrum, { delta }));

  // at first we will calculate the X values (simple mean)
  let slots = getSlots(spectra, options);

  let x = Float64Array.from(slots.map((slot) => slot.average));
  let y = new Float64Array(x.length);

  let positions = new Uint32Array(spectra.length);
  for (let i = 0; i < slots.length; i++) {
    let slot = slots[i];
    for (let j = 0; j < spectra.length; j++) {
      let spectrum = spectra[j];
      while (
        positions[j] < spectrum.x.length &&
        spectrum.x[positions[j]] <= slot.to
      ) {
        y[i] += spectrum.y[positions[j]];
        positions[j]++;
      }
    }
  }

  return { x, y };
}
