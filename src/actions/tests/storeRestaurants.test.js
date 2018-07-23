import { storeRestaurants } from '../storeRestaurants';

describe('storeRestaurants action', () => {
  it('has a type of STORE_RESTAURANTS', () => {
    const expected = {
      type: 'STORE_RESTAURANTS',
      restaurant: ['cafeteria line']
    };
    const result = storeRestaurants(['cafeteria line']);

    expect(result).toEqual(expected);
  });
});