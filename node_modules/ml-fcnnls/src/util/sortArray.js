/**
 * Sorts an array and returns an object with the sorted array and the corresponding indices.
 * @param {Array<Number>} v
 */
export default function sortArray(array) {
  const v = array.map((value, index) => {
    return { value, index };
  });

  v.sort((a, b) => {
    if (a.value === b.value) return a.index - b.index;
    return a.value - b.value;
  });

  let values = v.map((item) => item.value);
  let indices = v.map((item) => item.index);
  return { values, indices };
}
