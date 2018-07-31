import { foodSpecials } from '../foodSpecials';

describe('foodSpecials reducer', () => {
  it('returns  a default',  () => {
    const expected = [];

    expect(foodSpecials(undefined, {})).toEqual(expected);
  });

  it('returns the previous state if the  action type is invalid',  () => {
    const expected = [];
    const action = {
      type: 'does anyone even read these?'
    };
    const result = foodSpecials(undefined, action);

    expect(result).toEqual(expected);
  });

  it('returns a new state when given an action type of STORE_FOOD_SPECIALS', () => {
    const state = [];
    const foodSpecial = [{name: 'chicken pot pie', best_deal: false}];
    const action = {
      type: 'STORE_FOOD_SPECIALS',
      foodSpecial
    };
    const expected = foodSpecial;
    const result = foodSpecials(state, action);

    expect(result).toEqual(expected);
  });
});