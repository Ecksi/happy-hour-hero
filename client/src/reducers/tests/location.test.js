import { location } from '../location';

describe('location reducer', () => {
  it('return a default', () => {
    const expected = { "address": null, "latitude": 39.750801, "longitude": -104.996595 };

    expect(location(undefined, {})).toEqual(expected);
  });

  it('returns the previous state if the action type is invalid', () => {
    const expected = { "address": null, "latitude": 39.750801, "longitude": -104.996595 };
    const action = {
      type: 'i farted'
    };
    const result = location(undefined, action);

    expect(result).toEqual(expected);
  });

  it('returns a new state when given an action type of STORE_LOCATION', () => {
    const state = [];
    const address = 'Turing';
    const latitude = '456';
    const longitude = '123';
    const action = {
      type: 'STORE_LOCATION',
      address,
      longitude,
      latitude
    };
    const expected = { "address": "Turing", "latitude": "456", "longitude": "123" };
    const result = location(state, action);

    expect(result).toEqual(expected);
  });
});