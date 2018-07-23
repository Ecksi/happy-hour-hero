import { storeDrinkSpecials } from '../storeDrinkSpecials';

describe('storeDrinkSpecials action', () => {
  it('has a type of STORE_DRINK_SPECIALS', () => {
    const expected = {
      type: 'STORE_DRINK_SPECIALS',
      drinkSpecial: ['drank']
    };
    const result = storeDrinkSpecials(['drank']);

    expect(result).toEqual(expected);
  });
});