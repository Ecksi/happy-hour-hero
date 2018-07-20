export const storeLocation = (address, longitude, latitude) => ({
  type: 'STORE_LOCATION',
  address,
  longitude,
  latitude
});