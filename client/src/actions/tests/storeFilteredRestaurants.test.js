import  { storeFilteredRestaurants } from '../storeFilteredRestaurants';

describe('storeFilteredRestaurants action', () => {
  it('has a type of STORE_FILTERED_RESTAURANTS', () => {
    const expected = {
      type: 'STORE_FILTERED_RESTAURANTS',
      restaurants: ['burrito giant']
    };
    const result = storeFilteredRestaurants(['burrito giant']);

    expect(result).toEqual(expected);
  });
});