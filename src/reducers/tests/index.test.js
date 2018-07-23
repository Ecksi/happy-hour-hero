import { createStore } from 'redux';
import { rootReducer } from '../index';

const store = createStore(rootReducer);

describe('rootReducer', () => {
  it('matches the snapshot', () => {
    expect(rootReducer).toMatchSnapshot();
  });

  it('drinkSpecials should match the default state given an empty action', () => {
    expect(store.getState().drinkSpecials).toEqual([]);
  });

  it('foodSpecials should match the default state given an empty action', () => {
    expect(store.getState().foodSpecials).toEqual([]);
  });

  it('filteredRestaurants should match the default state given an empty action', () => {
    expect(store.getState().filteredRestaurants).toEqual([]);
  });

  it('happyHours should match the default state given an empty action', () => {
    expect(store.getState().happyHours).toEqual([]);
  });

  it('location should match the default state given an empty action', () => {
    expect(store.getState().location).toEqual({ "address": null, "latitude": 39.750801, "longitude": -104.996595 });
  });

  it('restaurants should match the default state given an empty action', () => {
    expect(store.getState().restaurants).toEqual([]);
  });
});