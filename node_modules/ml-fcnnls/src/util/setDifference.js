/**
 * Computes the set difference A\B
 * @private
 * @param {A} set A as an array
 * @param {B} set B as an array
 */
export default function setDifference(A, B) {
  let C = [];
  for (let i of A) {
    if (!B.includes(i)) C.push(i);
  }
  return C;
}
