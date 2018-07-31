import { storeHappyHours } from '../storeHappyHours';

describe('storeHappyHours action', () => {
  it('has a type of STORE_HAPPY_SPECIALS', () => {
    const expected = {
      type: 'STORE_HAPPY_HOURS',
      happyHour: ['woo']
    };
    const result = storeHappyHours(['woo']);

    expect(result).toEqual(expected);
  });
});