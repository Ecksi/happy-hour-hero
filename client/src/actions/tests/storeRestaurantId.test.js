import { storeRestaurantId } from '../storeRestaurantId';

describe('storeRestaurants action', () => {
  it('has a type of STORE_RESTAURANT_ID', () => {
    const expected = {
      type: 'STORE_RESTAURANT_ID',
      id: ['smush burger']
    };
    const result = storeRestaurantId(['smush burger']);

    expect(result).toEqual(expected);
  });
});