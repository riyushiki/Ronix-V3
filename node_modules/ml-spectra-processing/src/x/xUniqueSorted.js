export function xUniqueSorted(array) {
  return Float64Array.from(new Set(array)).sort();
}
