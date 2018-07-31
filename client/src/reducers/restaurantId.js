export const restaurantId = (state = null, action) => {
  switch (action.type) {
    case 'STORE_RESTAURANT_ID':
      return action.id;
    default:
      return state;
  }
};  