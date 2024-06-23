import getZones from '../getZones';

describe('getZones', () => {
  it('no options', function () {
    let zones = getZones(0, 10);
    expect(zones).toStrictEqual([
      {
        from: 0,
        to: 10,
      },
    ]);
  });

  it('one exclusion', function () {
    let zones = getZones(0, 10, [{ from: 2, to: 4 }]);
    expect(zones).toStrictEqual([
      {
        from: 0,
        to: 2,
      },
      {
        from: 4,
        to: 10,
      },
    ]);
  });

  it('two symmetric exclusion', function () {
    let zones = getZones(0, 10, [
      { from: 2, to: 4 },
      { from: 6, to: 8 },
    ]);
    expect(zones).toStrictEqual([
      {
        from: 0,
        to: 2,
      },
      {
        from: 4,
        to: 6,
      },
      {
        from: 8,
        to: 10,
      },
    ]);
  });

  it('two exclusion', function () {
    let zones = getZones(0, 12, [
      { from: 1, to: 2 },
      { from: 3, to: 4 },
    ]);
    expect(zones).toStrictEqual([
      {
        from: 0,
        to: 1,
      },
      {
        from: 2,
        to: 3,
      },
      {
        from: 4,
        to: 12,
      },
    ]);
  });

  it('overlaping exclusionsn', function () {
    let zones = getZones(0, 10, [
      { from: 2, to: 4 },
      { from: 2, to: 8 },
    ]);
    expect(zones).toStrictEqual([
      {
        from: 0,
        to: 2,
      },
      {
        from: 8,
        to: 10,
      },
    ]);
  });

  it('outside range exclusion', function () {
    let zones = getZones(0, 10, [
      { from: -2, to: -4 },
      { from: 12, to: 14 },
    ]);
    expect(zones).toStrictEqual([
      {
        from: 0,
        to: 10,
      },
    ]);
  });

  it('partial outside range exclusion', function () {
    let zones = getZones(0, 10, [
      { from: -2, to: 2 },
      { from: 8, to: 12 },
    ]);
    expect(zones).toStrictEqual([
      {
        from: 2,
        to: 8,
      },
    ]);
  });

  it('two exclusions with one outside range', function () {
    let zones = getZones(0, 3, [
      { from: 1, to: 2 },
      { from: 4, to: 5 },
    ]);
    expect(zones).toStrictEqual([
      {
        from: 0,
        to: 1,
      },
      {
        from: 2,
        to: 3,
      },
    ]);
  });
});
