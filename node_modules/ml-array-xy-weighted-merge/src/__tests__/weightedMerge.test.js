import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';

import weightedMerge from '..';

// eslint-disable-next-line import/no-extraneous-dependencies

expect.extend({ toBeDeepCloseTo });

const points = {
  x: [100.001, 100.002, 200.01, 200.02, 300.0001, 300.0002],
  y: [10, 11, 20, 21, 30, 31],
};
describe('weightedMerge', () => {
  it('default value', () => {
    const merged = weightedMerge(points);
    expect(merged.x).toBeDeepCloseTo(
      [
        (100.002 * 10 + 100.001 * 11) / 21,
        200.01,
        200.02,
        (300.0002 * 30 + 300.0001 * 31) / 61,
      ],
      4,
    );
    expect(merged.y).toStrictEqual([21, 20, 21, 61]);
  });

  it('custom value', () => {
    const merged = weightedMerge(points, { groupWidth: 0.010001 });
    expect(merged.x).toBeDeepCloseTo(
      [
        (100.002 * 10 + 100.001 * 11) / 21,
        (200.01 * 20 + 200.02 * 21) / 41,
        (300.0002 * 30 + 300.0001 * 31) / 61,
      ],
      4,
    );
    expect(merged.y).toStrictEqual([21, 41, 61]);
  });
});
