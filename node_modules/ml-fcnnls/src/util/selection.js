/**
 * Returns a new array based on extraction of specific indices of an array
 * @private
 * @param {Array} vector
 * @param {Array} indices
 */
export default function selection(vector, indices) {
  let u = []; //new Float64Array(indices.length);
  for (let i = 0; i < indices.length; i++) {
    u[i] = vector[indices[i]];
  }
  return u;
}
