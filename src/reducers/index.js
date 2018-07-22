import { combineReducers } from '../../../../../../../../../Library/Caches/typescript/2.9/node_modules/redux';
import { location } from './location';
import { restaurants } from './restaurants';
import { filteredRestaurants } from './filteredRestaurants';
import { happyHours } from './happyHours';
import { drinkSpecials } from './drinkSpecials';
import { foodSpecials } from './foodSpecials';
import { restaurantId } from './restaurantId';

export const rootReducer = combineReducers({
  location,
  restaurants,
  filteredRestaurants,
  happyHours,
  drinkSpecials,
  foodSpecials,
  restaurantId
});
