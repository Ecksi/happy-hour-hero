import { day } from '../day';

describe('day reducer', () => {
  it('returns a default', () => {
    const expected = null;

    expect(day(undefined, {})).toEqual(expected);
  });

  it('returns the previous state if the action type is invalid', () => {
    const expected = null;
    const action = {
      type: 'zorkday'
    };
    const result = day(undefined, action);

    expect(result).toEqual(expected);
  });

  it('returns a new state when given an action type of STORE_DAY', () => {
    const state = null;
    const expected = 'zorkday';
    const action = {
      type: 'STORE_DAY',
      day: 'zorkday'
    };
    const result = day(state, action);

    expect(result).toEqual(expected);
  });
});