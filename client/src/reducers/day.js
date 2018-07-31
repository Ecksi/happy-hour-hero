export const day = (state = null, action) => {
  switch (action.type) {
    case 'STORE_DAY':
      return action.day;
    default:
      return state;
  }
};  