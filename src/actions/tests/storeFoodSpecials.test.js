import { storeFoodSpecials } from '../storeFoodSpecials';

describe('storeFoodSpecials action', () => {
  it('has a type of STORE_FOOD_SPECIALS', () => {
    const expected = {
      type: 'STORE_FOOD_SPECIALS',
      foodSpecial: ['grub']
    };
    const result = storeFoodSpecials(['grub']);

    expect(result).toEqual(expected);
  });
});