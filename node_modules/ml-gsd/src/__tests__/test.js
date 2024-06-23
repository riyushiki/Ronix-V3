import { readFileSync } from 'fs';
import { join } from 'path';

import { gsd } from '..';

function lorentzian(x, x0 = 0, gamma = 1) {
  return (
    (gamma * gamma) / (Math.PI * gamma * (gamma * gamma + (x - x0) * (x - x0)))
  );
}

describe('Global spectra deconvolution simple simulated spectrum', () => {
  // Test case obtained from Pag 443, Chap 8.
  it('Should provide the right result ...', () => {
    let spectrum = JSON.parse(
      readFileSync(join(__dirname, '/data//C2.json'), 'utf8'),
    );
    let result = gsd(
      { x: spectrum[0], y: spectrum[1] },
      {
        // noiseLevel: 0.001,
        minMaxRatio: 0,
        realTopDetection: true,
        smoothY: false,
      },
    );

    expect(result[0].x).toBeCloseTo(24, 2);
    expect(result[0].y).toBeCloseTo(0.09394372786996513, 5);

    expect(result[1].x).toBeCloseTo(25, 2);
    expect(result[1].y).toBeCloseTo(0.0020321396708958394, 5);
  });

  it('Should give 10 peaks', () => {
    const size = 300;
    const fourth = size / 11;
    let times = new Array(size);
    let tic = new Array(size);

    for (let i = 0; i < size; ++i) {
      times[i] = i;
      tic[i] =
        lorentzian(i, fourth) +
        2 * lorentzian(i, 2 * fourth) +
        lorentzian(i, 3 * fourth) +
        2 * lorentzian(i, 4 * fourth) +
        lorentzian(i, 5 * fourth) +
        2 * lorentzian(i, 6 * fourth) +
        lorentzian(i, 7 * fourth) +
        2 * lorentzian(i, 8 * fourth) +
        lorentzian(i, 9 * fourth) +
        2 * lorentzian(i, 10 * fourth);
    }
    let ans = gsd(
      { x: times, y: tic },
      {
        noiseLevel: 0,
        realTopDetection: false,
        smoothY: false,
        sgOptions: { windowSize: 5, polynomial: 3 },
      },
    );

    expect(ans).toHaveLength(10);
  });
});
