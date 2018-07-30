import { storeDay } from '../storeDay';

describe('storeDay action', () => {
  it('has a type of STORE_DAY', () => {
    const expected = {
      type: 'STORE_DAY',
      day: ['Sunday']
    };
    const result = storeDay(['Sunday']);

    expect(result).toEqual(expected);
  });
});