import { restaurants } from '../restaurants';

describe('restaurants reducer', () => {
  it('returns a default', () => {
    const expected = [];

    expect(restaurants(undefined, {})).toEqual(expected);
  });

  it('returns the previous state if the action type is invalid', () => {
    const expected = [];
    const action = {
      type: 'sup young thug'
    };
    const result = restaurants(undefined,  action);

    expect(result).toEqual(expected);
  });

  it('returns a new state when given an action type of STORE_RESTAURANTS', () => {
    const state = [];
    const restaurant = ['po bois biscut co', 'biscut brambles'];
    const action = {
      type: 'STORE_RESTAURANTS',
      restaurant
    };
    const expected = restaurant;
    const result = restaurants(state, action);

    expect(result).toEqual(expected);
  });
});