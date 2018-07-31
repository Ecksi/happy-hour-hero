export const restaurants = (state = [], action) => {
  switch (action.type) {
    case 'STORE_RESTAURANTS':
      return [...action.restaurant];
    default:
      return state;
  }
};  