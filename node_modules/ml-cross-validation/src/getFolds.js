/**
 * get folds indexes
 * @param {Array} features
 * @param {Number} k - number of folds, a
 */
export function getFolds(features, k = 5) {
  let N = features.length;
  let allIdx = new Array(N);
  for (let i = 0; i < N; i++) {
    allIdx[i] = i;
  }

  let l = Math.floor(N / k);
  // create random k-folds
  let current = [];
  let folds = [];
  while (allIdx.length) {
    let randi = Math.floor(Math.random() * allIdx.length);
    current.push(allIdx[randi]);
    allIdx.splice(randi, 1);
    if (current.length === l) {
      folds.push(current);
      current = [];
    }
  }
  // we push the remaining to the last fold so that the total length is
  // preserved. Otherwise the Q2 will fail.
  if (current.length) current.forEach((e) => folds[k - 1].push(e));
  folds = folds.slice(0, k);

  let foldsIndex = folds.map((x, idx) => ({
    testIndex: x,
    trainIndex: [].concat(...folds.filter((el, idx2) => idx2 !== idx)),
  }));
  return foldsIndex;
}
