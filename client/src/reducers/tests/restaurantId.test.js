import { restaurantId } from '../restaurantId';

describe('restaurantId reducer', () => {
  it('returns a default', () => {
    const expected = null;

    expect(restaurantId(undefined, {})).toEqual(expected);
  });

  it('returns the previous state if the action type is invalid', () => {
    const expected = null;
    const action = {
      type: 'schwifty'
    };
    const result = restaurantId(undefined, action);

    expect(result).toEqual(expected);
  });

  it('returns a new state when given an action type of STORE_RESTAURANT_ID', () => {
    const state = null;
    const expected = 5;
    const action = {
      type: 'STORE_RESTAURANT_ID',
      id: 5
    };
    const result = restaurantId(state, action);

    expect(result).toEqual(expected);
  });
});