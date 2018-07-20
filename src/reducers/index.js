import { combineReducers } from 'redux';
import { location } from '../reducers/location';
import { restaurants } from '../reducers/restaurants';
import { filteredRestaurants } from '../reducers/filteredRestaurants';

export const rootReducer = combineReducers({
  location,
  restaurants,
  filteredRestaurants
});
