import { expect, it, describe } from 'vitest';

import checkArrayLength from '../checkArrayLength';

describe('checkArrayLength', () => {
  it('throws on different Length', () => {
    const expected = /x and y arrays must have the same length/;
    expect(() => checkArrayLength([], [1])).toThrow(expected);
    expect(() => checkArrayLength([1], [])).toThrow(expected);
    expect(() => checkArrayLength([1], [1, 2])).toThrow(expected);
  });

  it('throws if not arrays', () => {
    const expected = /x and y must be arrays/;
    // @ts-expect-error testing invalid input
    expect(() => checkArrayLength(null, [1])).toThrow(expected);
    // @ts-expect-error testing invalid input
    expect(() => checkArrayLength([], null)).toThrow(expected);
    // @ts-expect-error testing invalid input
    expect(() => checkArrayLength()).toThrow(expected);
    // @ts-expect-error testing invalid input
    expect(() => checkArrayLength(42, [])).toThrow(expected);
    // @ts-expect-error testing invalid input
    expect(() => checkArrayLength([1, 2, 3, 4, 5], 'hello')).toThrow(expected);
  });

  it('correct result', () => {
    expect(checkArrayLength([1, 2], [2, 3])).toBeUndefined();
    expect(
      checkArrayLength(new Float64Array([1, 2]), new Float64Array([2, 3])),
    ).toBeUndefined();
    expect(checkArrayLength([1, 2], new Float64Array([2, 3]))).toBeUndefined();
  });
});
