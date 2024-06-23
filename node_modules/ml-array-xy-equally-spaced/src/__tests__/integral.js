import integral from '../integral';

describe('integral', () => {
  it('should compute expect(integral with a,b, x0 and x1', () => {
    expect(integral(0, 1, 1, 0)).toBe(0.5);
    expect(integral(0, 3, 1, 0)).toBe(4.5);
    expect(integral(0, 3, 1, 1)).toBe(7.5);
    expect(integral(0, 3, 1, 2)).toBe(10.5);
    expect(integral(0, 3, 1, -1)).toBe(1.5);
    expect(integral(0, 3, 1, -2)).toBe(-1.5);
    expect(integral(0, 3, -1, 0)).toBe(-4.5);
    expect(integral(-1, 3, -1, 0)).toBe(-4);
  });
});
