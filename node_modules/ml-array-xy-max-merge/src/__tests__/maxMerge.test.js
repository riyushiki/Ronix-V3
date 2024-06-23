import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import maxMerge from '..';

// eslint-disable-next-line import/no-extraneous-dependencies

expect.extend({ toBeDeepCloseTo });

const points = {
  x: [100.001, 100.002, 200.01, 200.02, 300.0001, 300.0002],
  y: [10, 11, 20, 21, 32, 31],
};
describe('maxMerge', () => {
  it('default value', () => {
    const merged = maxMerge(points);
    expect(merged.x).toBeDeepCloseTo([100.002, 200.01, 200.02, 300.0001], 4);
    expect(merged.y).toStrictEqual([21, 20, 21, 63]);
  });

  it('custom value', () => {
    const merged = maxMerge(points, { groupWidth: 0.010001 });
    expect(merged.x).toBeDeepCloseTo([100.002, 200.02, 300.0001], 4);
    expect(merged.y).toStrictEqual([21, 41, 63]);
  });
});
