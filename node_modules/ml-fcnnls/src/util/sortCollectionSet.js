/**
 *
 * @private
 * @param {Array of arrays} collection
 */
export default function sortCollectionSet(collection) {
  let objectCollection = collection
    .map((value, index) => {
      let key = BigInt(0);
      value.forEach((item) => (key |= BigInt(1) << BigInt(item)));
      return { value, index, key };
    })
    .sort((a, b) => {
      if (a.key - b.key < 0) return -1;
      return 1;
    });

  let sorted = [];
  let indices = [];

  let key;
  for (let set of objectCollection) {
    if (set.key !== key) {
      key = set.key;
      indices.push([]);
      sorted.push(set.value);
    }
    indices[indices.length - 1].push(set.index);
  }

  let result = {
    values: sorted,
    indices,
  };
  return result;
}
