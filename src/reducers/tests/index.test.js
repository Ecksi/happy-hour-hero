import { createStore } from 'redux';
import rootReducer from '../index';
import drinkSpecials from '../drinkSpecials';
import filteredRestaurants from '../filteredRestaurants';
import foodSpecials from '../foodSpecials';
import happyHours from '../happyHours';
import location from '../location';
import restaurants from '../restaurants';

// const store = createStore(rootReducer);

describe('rootReducer', () => {
  it('matches the snapshot', () => {
    expect(rootReducer).toMatchSnapshot();
  });

  
});