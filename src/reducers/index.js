import { combineReducers } from 'redux';
import { location } from '../reducers/location';
import { restaurants } from '../reducers/restaurants';

export const rootReducer = combineReducers({
  location,
  restaurants
});
