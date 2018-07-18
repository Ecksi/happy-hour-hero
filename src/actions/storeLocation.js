export const storeLocation = (city, state, zip, longitude, latitude) => ({
  type: 'STORE_LOCATION',
  city,
  state,
  zip,
  longitude,
  latitude
});