import { selectMethod } from '../selectMethod';

describe('selectMethod', () => {
  it('throw errors', () => {
    expect(selectMethod).toThrow('Unknown kind algorithm');
    expect(() => {
      selectMethod({ kind: 'fail' });
    }).toThrow('Unknown kind algorithm');
  });
});
