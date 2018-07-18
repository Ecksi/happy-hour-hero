export const location = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_LOCATION':
      return {longitude: action.longitude, lattitude: action.lattitude};
    default:
      return state;
  }
};  