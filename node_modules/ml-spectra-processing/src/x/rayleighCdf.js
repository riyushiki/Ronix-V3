export default function rayleighCdf(x, sigma = 1) {
  if (x < 0) {
    return 0;
  }
  return -Math.expm1(-Math.pow(x, 2) / (2 * Math.pow(sigma, 2)));
}
