export const location = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_LOCATION':
      return {city: action.city, state: action.state, zip: action.zip, address: action.address, longitude: action.longitude, latitude: action.latitude};
    default:
      return state;
  }
};  