export const location = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_LOCATION':
      return {city: action.city, state: action.state, zip: action.zip, longitude: action.longitude, latitude: action.latitude};
    default:
      return state;
  }
};  