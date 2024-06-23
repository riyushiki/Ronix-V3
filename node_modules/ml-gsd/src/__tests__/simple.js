import { toMatchCloseTo } from 'jest-matcher-deep-close-to';

import { gsd } from '..';

expect.extend({ toMatchCloseTo });

describe('Simple test cases', () => {
  let x = [];
  let y = [];
  let negY = [];
  for (let i = 0; i < 10; i++) {
    x.push(x.length);
    y.push(0);
    negY.push(0);
  }
  for (let i = 0; i <= 10; i++) {
    x.push(x.length);
    let newY = i > 5 ? 10 - i : i;
    y.push(newY);
    negY.push(-newY);
  }
  for (let i = 0; i < 10; i++) {
    x.push(x.length);
    y.push(0);
    negY.push(0);
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

    expect(peaks[0].y).toBeCloseTo(4.657, 3);
    expect(peaks[0].base).toBeCloseTo(1.1956, 3);
    expect(peaks[0].x).toStrictEqual(15);
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
    expect(peaks[0].y).toBeCloseTo(-4.657, 3);
    expect(peaks[0].base).toBeCloseTo(1.1956, 3);
    expect(peaks[0].x).toStrictEqual(15);
  });

  it('gsd not realtop asymetric', () => {
    let Y2 = y.slice(0);
    Y2[14] = 5;
    let peaks = gsd(
      { x, y: Y2 },
      {
        realTopDetection: false,
        smoothY: true,
        sgOptions: {
          windowSize: 5,
          polynomial: 3,
        },
      },
    );

    expect(peaks).toMatchCloseTo(
      [
        {
          base: 1.2434539324230613,
          index: 15,
          left: {
            index: 13,
            x: 13,
          },
          right: {
            index: 16,
            x: 16,
          },
          soft: false,
          width: 3,
          x: 15,
          y: 5,
        },
      ],
      2,
    );
  });

  it('gsd realtop', () => {
    let Y2 = y.slice();
    Y2[14] = 5;
    let peaks = gsd(
      { x, y: Y2 },
      {
        realTopDetection: true,
        smoothY: false,
        sgOptions: {
          windowSize: 5,
          polynomial: 3,
        },
      },
    );
    expect(peaks).toMatchCloseTo(
      [
        {
          base: 1.2434539324230613,
          index: 15,
          left: {
            index: 13,
            x: 13,
          },
          right: {
            index: 16,
            x: 16,
          },
          soft: false,
          width: 3,
          x: 14.5,
          y: 4.006546067576939,
        },
      ],
      2,
    );
  });
});
