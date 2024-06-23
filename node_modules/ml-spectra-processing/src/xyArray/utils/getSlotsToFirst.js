import { xyArrayWeightedMerge } from '../xyArrayWeightedMerge';

export function getSlotsToFirst(spectra, options = {}) {
  const { delta = 1 } = options;
  const deltaIsFunction = typeof delta === 'function';

  let firstXs = spectra[0].x;
  let slots = [];
  // we first create the slots based on the first spectrum
  for (let i = 0; i < firstXs.length; i++) {
    let currentDelta = deltaIsFunction ? delta(firstXs[i]) : delta;
    slots.push({
      from: firstXs[i] - currentDelta,
      to: firstXs[i] + currentDelta,
      value: firstXs[i],
    });
  }

  let otherXs = xyArrayWeightedMerge(spectra.slice(1), options).x;
  let currentPosition = 0;
  for (let slot of slots) {
    while (
      otherXs[currentPosition] < slot.to &&
      currentPosition < otherXs.length
    ) {
      if (otherXs[currentPosition] < slot.from) {
        let currentDelta = deltaIsFunction
          ? delta(otherXs[currentPosition])
          : delta;
        slots.push({
          from: otherXs[currentPosition] - currentDelta,
          to: otherXs[currentPosition] + currentDelta,
          value: otherXs[currentPosition],
        });
      }
      currentPosition++;
    }
  }
  for (let i = currentPosition; i < otherXs.length; i++) {
    let currentDelta = deltaIsFunction ? delta(otherXs[i]) : delta;
    slots.push({
      from: otherXs[i] - currentDelta,
      to: otherXs[i] + currentDelta,
      value: otherXs[i],
    });
  }

  slots.sort((a, b) => a.value - b.value);

  // we prevent slots overlap in the first spectrum
  for (let i = 0; i < slots.length - 1; i++) {
    if (slots[i].to > slots[i + 1].from) {
      let middle = (slots[i].value + slots[i + 1].value) / 2;
      slots[i].to = middle;
      slots[i + 1].from = middle;
    }
  }
  return slots;
}
