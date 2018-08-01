export const drinkSpecials = (state = [], action) => {
  switch (action.type) {
    case 'STORE_DRINK_SPECIALS':
      return [...state, ...action.drinkSpecial];
    default:
      return state;
  }
};  