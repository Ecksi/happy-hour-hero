export const location = (state = {address: null, latitude: 39.750801, longitude: -104.996595}, action) => {
  switch (action.type) {
    case 'STORE_LOCATION':
      return {address: action.address, longitude: action.longitude, latitude: action.latitude};
    default:
      return state;
  }
};  