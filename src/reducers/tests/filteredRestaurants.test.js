import { filteredRestaurants } from '../filteredRestaurants';

describe('filteredRestaurants reducer', () => {
  it('returns a default', () => {
    const expected = [];

    expect(filteredRestaurants(undefined, {})).toEqual(expected);
  });

  it('returns the previous state if the action type is invalid', () => {
    const expected = [];
    const action = {
      type: 'i gotta pea'
    };
    const result =  filteredRestaurants(undefined, action);

    expect(result).toEqual(expected);
  });

  it('returns a new state when given an action type of  STORE_FILTERED_RESTAURANTS', () => {
    const state = [];
    const restaurants = ['Brothers', 'Hapa'];
    const action = {
      type: 'STORE_FILTERED_RESTAURANTS',
      restaurants
    };
    const expected = restaurants;
    const result = filteredRestaurants(state, action);

    expect(result).toEqual(expected);
  });
});