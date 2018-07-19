export const storeLocation = (city, state, zip, address, longitude, latitude) => ({
  type: 'STORE_LOCATION',
  city,
  state,
  zip,
  address,
  longitude,
  latitude
});