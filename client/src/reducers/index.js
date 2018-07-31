import { combineReducers } from 'redux';
import { location } from './location';
import { restaurants } from './restaurants';
import { filteredRestaurants } from './filteredRestaurants';
import { happyHours } from './happyHours';
import { drinkSpecials } from './drinkSpecials';
import { foodSpecials } from './foodSpecials';
import { restaurantId } from './restaurantId';
import { day } from './day';


export const rootReducer = combineReducers({
  location,
  restaurants,
  filteredRestaurants,
  happyHours,
  drinkSpecials,
  foodSpecials,
  restaurantId,
  day
});
