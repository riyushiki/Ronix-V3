/**
 * A function to sample a dataset maintaining classes equilibrated
 * @param {Array} classVector - an array containing class or group information
 * @param {Number} fraction - a fraction of the class to sample
 * @return {Object} - an object with indexes
 */

export function sampleAClass(classVector, fraction) {
  // sort the vector
  let classVectorSorted = JSON.parse(JSON.stringify(classVector));
  let result = Array.from(Array(classVectorSorted.length).keys()).sort((a, b) =>
    classVectorSorted[a] < classVectorSorted[b]
      ? -1
      : (classVectorSorted[b] < classVectorSorted[a]) | 0,
  );
  classVectorSorted.sort((a, b) => (a < b ? -1 : (b < a) | 0));

  // counts the class elements
  let counts = {};
  classVectorSorted.forEach((x) => (counts[x] = (counts[x] || 0) + 1));

  // pick a few per class
  let indexOfSelected = [];

  Object.keys(counts).forEach((e, i) => {
    let shift = [];
    Object.values(counts).reduce((a, c, item) => (shift[item] = a + c), 0);

    let arr = [...Array(counts[e]).keys()];

    let r = [];
    for (let j = 0; j < Math.floor(counts[e] * fraction); j++) {
      let n = arr[Math.floor(Math.random() * arr.length)];
      r.push(n);
      let ind = arr.indexOf(n);
      arr.splice(ind, 1);
    }

    if (i === 0) {
      indexOfSelected = indexOfSelected.concat(r);
    } else {
      indexOfSelected = indexOfSelected.concat(r.map((x) => x + shift[i - 1]));
    }
  });

  // sort back the index
  let trainIndex = [];
  indexOfSelected.forEach((e) => trainIndex.push(result[e]));

  let testIndex = [];
  let mask = [];
  classVector.forEach((el, idx) => {
    if (trainIndex.includes(idx)) {
      mask.push(true);
    } else {
      mask.push(false);
      testIndex.push(idx);
    }
  });
  return { trainIndex, testIndex, mask };
}
