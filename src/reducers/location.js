export const location = (state = {city: null, state: null, zip: null, address: null, latitude: 39.750801, longitude: -104.996595}, action) => {
  switch (action.type) {
    case 'STORE_LOCATION':
      return {city: action.city, state: action.state, zip: action.zip, address: action.address, longitude: action.longitude, latitude: action.latitude};
    default:
      return state;
  }
};  