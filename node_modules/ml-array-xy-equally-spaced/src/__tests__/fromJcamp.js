import equallySpaced from '..';

describe('on jcamp data', () => {
  let data = require('./data/jcamp.json');

  it('inbound', () => {
    let ans = equallySpaced(data, {
      from: 100,
      to: 1500,
      numberOfPoints: 1000,
    });
    ans.y.map((y) => expect(y).not.toBeNaN());
  });

  it('out of bounds start', () => {
    let ans = equallySpaced(data, {
      from: 0,
      to: 1500,
      numberOfPoints: 1000,
    });
    ans.y.map((y) => expect(y).not.toBeNaN());
  });

  it('out of bounds end', () => {
    let ans = equallySpaced(data, {
      from: 1000,
      to: 4500,
      numberOfPoints: 1000,
    });
    ans.y.map((y) => expect(y).not.toBeNaN());
  });

  it('completely out of bounds', () => {
    let ans = equallySpaced(data, {
      from: 3000,
      to: 4500,
      numberOfPoints: 1000,
    });
    ans.y.map((y) => expect(y).toBe(0));
  });

  it('Array with negative numbers by smooth', () => {
    let data = require('./data/debug.json');
    let j = 0;
    while (data.x[j] >= 0) j++;
    let index0 = j;
    while (data.x[j] >= 200) j++;
    let index200 = j;

    let ans = equallySpaced(data, {
      from: 0,
      to: 200,
      numberOfPoints: 7 * 1024,
      variant: 'smooth',
    });

    expect(data.y[index0] * 1.1 <= ans.y[0]).toBe(true);
    expect(data.y[index200] * 1.1 <= ans.y[7 * 1024 - 1]).toBe(true);
  });
});
