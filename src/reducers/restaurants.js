export const restaurants = (state = [], action) => {
  switch (action.type) {
    case 'STORE_RESTAURANTS':
      return [...action.restaurants];
    default:
      return state;
  }
};  