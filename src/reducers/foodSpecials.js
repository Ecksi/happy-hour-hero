export const foodSpecials = (state = [], action) => {
  switch (action.type) {
    case 'STORE_FOOD_SPECIALS':
      return [...state, ...action.foodSpecial];
    default:
      return state;
  }
};  