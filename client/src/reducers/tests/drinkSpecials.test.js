import { drinkSpecials } from '../drinkSpecials';

describe('drinkSpecials reducer', () => {
  it('returns a default', () => {
    const expected = [];

    expect(drinkSpecials(undefined, {})).toEqual(expected);
  });

  it('returns the previous state if the action type is invalid', () => {
    const expected = [];
    const action = {
      type: 'death to smoochy'
    };
    const result = drinkSpecials(undefined, action);

    expect(result).toEqual(expected);
  });

  it('returns a new state when given an action type of STORE_DRINK_SPECIALS', () => {
    const state = [];
    const drinkSpecial = [{name:'2 for 1', best_deal: true}];
    const action = {
      type: 'STORE_DRINK_SPECIALS',
      drinkSpecial
    };
    const expected = drinkSpecial;
    const result = drinkSpecials(state, action);

    expect(result).toEqual(expected);
  });
});