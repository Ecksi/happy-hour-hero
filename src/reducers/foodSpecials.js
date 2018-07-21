export const foodSpecials = (state = [], action) => {
  switch (action.type) {
    case 'STORE_FOOD_SPECIALS':
      return [...action.foodSpecial];
    default:
      return state;
  }
};  