import { toBeDeepCloseTo } from 'jest-matcher-deep-close-to';
import { getClasses } from 'ml-dataset-iris';

import { sampleAClass } from '../sampleAClass.js';

expect.extend({ toBeDeepCloseTo });

const metadata = getClasses();

describe('get sample of class', () => {
  let c = sampleAClass(metadata, 0.1).trainIndex;
  it('check length 0.1', () => {
    expect(c).toHaveLength(15);
  });
  let d = sampleAClass(metadata, 0.2).trainIndex;
  it('check length 1', () => {
    expect(d).toHaveLength(30);
  });
  let e = sampleAClass(metadata, 0.0).trainIndex;
  it('check length 0', () => {
    expect(e).toHaveLength(0);
  });
});
