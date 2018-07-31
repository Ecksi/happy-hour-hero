import { happyHours } from '../happyHours';

describe('happyHours reducer', () => {
  it('returns a default', () => {
    const expected = [];

    expect(happyHours(undefined, {})).toEqual(expected);
  });

  it('returns the previous state if the action type is invalid', () => {
    const expected = [];
    const action = {
      type: 'smishmorgishborg'
    };
    const result = happyHours(undefined, action);

    expect(result).toEqual(expected);
  });

  it('returns a new state when given an action type of STORE_HAPPY_HOURS', () => {
    const state = [];
    const happyHour = ['stuff', 'moar struff'];
    const action = {
      type: 'STORE_HAPPY_HOURS',
      happyHour
    };
    const expected = happyHour;
    const result = happyHours(state, action);

    expect(result).toEqual(expected);
  });
});