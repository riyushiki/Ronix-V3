/**
 * Group peaks based on factor and add group property in peaks
 * @param {array} peakList
 * @param {number} factor
 */

export function groupPeaks(peakList, factor = 1) {
  if (peakList.length === 0) return [];
  let peaks = peakList.sort((a, b) => a.x - b.x);

  let previousPeak = { x: Number.NEGATIVE_INFINITY, width: 1 };
  let currentGroup = [previousPeak];
  let groups = [];

  for (let peak of peaks) {
    if (
      (peak.x - previousPeak.x) / (peak.width + previousPeak.width) <=
      factor / 2
    ) {
      currentGroup.push(peak);
    } else {
      currentGroup = [peak];
      groups.push(currentGroup);
    }
    peak.group = groups.length - 1;
    previousPeak = peak;
  }

  return groups;
}
