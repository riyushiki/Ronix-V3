import { toMatchCloseTo } from 'jest-matcher-deep-close-to';

import { gsd } from '..';

expect.extend({ toMatchCloseTo });

describe('Simple shifted baseline test cases', () => {
  let x = [];
  let y = [];
  let negY = [];
  for (let i = 0; i < 10; i++) {
    x.push(x.length);
    y.push(1);
    negY.push(-1);
  }
  for (let i = 0; i <= 10; i++) {
    x.push(x.length);
    let newY = i > 5 ? 10 - i : i;
    y.push(newY);
    negY.push(-newY);
  }
  for (let i = 0; i < 10; i++) {
    x.push(x.length);
    y.push(1);
    negY.push(-1);
  }

  it('gsd not realtop', () => {
    let peaks = gsd(
      { x, y },
      {
        realTopDetection: false,
        smoothY: true,
        sgOptions: {
          windowSize: 5,
          polynomial: 3,
        },
      },
    );
    expect(peaks).toHaveLength(1);
    expect(peaks[0]).toMatchCloseTo({
      index: 15,
      x: 15,
      y: 4.657142857142857,
      width: 2,
      soft: false,
      left: { x: 14, index: 14 },
      right: { x: 16, index: 16 },
      base: 0.6695521174585716,
    });
  });

  it('gsd negative peak', () => {
    let peaks = gsd(
      { x, y: negY },
      {
        realTopDetection: false,
        maxCriteria: false,
        smoothY: true,
        sgOptions: {
          windowSize: 5,
          polynomial: 3,
        },
      },
    );
    expect(peaks).toHaveLength(1);
    expect(peaks[0]).toMatchCloseTo({
      index: 15,
      x: 15,
      y: -4.657142857142857,
      width: 2,
      soft: false,
      left: { x: 14, index: 14 },
      right: { x: 16, index: 16 },
      base: 0.6695521174585716,
    });
  });
});
