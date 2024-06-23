export function zoneToX(zone, size) {
  const { from, to } = zone;
  let array = new Float64Array(size);
  let step = (to - from) / (size - 1);
  for (let i = 0; i < size; i++) {
    array[i] = from + step * i;
  }
  return array;
}
