import { storeLocation } from '../storeLocation';

describe('storeLocation action', () => {
  it('has a type of STORE_LOCATION', () => {
    const expected = {
      type: 'STORE_LOCATION',
      address: 'snu',
      longitude: '1234',
      latitude: '5678'
    };
    const result = storeLocation('snu', '1234', '5678');

    expect(result).toEqual(expected);
  });
});