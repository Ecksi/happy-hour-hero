export const filteredRestaurants = (state = [], action) => {
  switch (action.type) {
    case 'STORE_FILTERED_RESTAURANTS':
      return [...action.restaurants];
    default:
      return state;
  }
};  