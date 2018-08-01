import React from 'react';
import { shallow } from 'enzyme';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  let wrapper;
  let mockRestaurants;

  beforeEach(() => {
    mockRestaurants = [{
      id: 1, 
      name: "Brothers Bar", 
      address: "1920 Market St", 
      phone: "(303) 297-2767", 
      website: "http://www.brothersbar.com/denver-co/",
      city: "Denver",
      created_at: "2018-07-30T13:59:04.919Z",
      latitude: "39.752816",
      longitude:"-104.993984",
      restaurant_image: "http://www.brothersbar.com/wp-content/uploads/2015/10/GALLERY-Stapleton.jpg",
      state:"CO",
      zip_code: 80202
    }];

    wrapper = shallow(<SearchBar 
      filteredRestaurants={mockRestaurants}
      location={{address: ''}}
      storeLocation={jest.fn()}
      storeFilteredRestaurants={jest.fn()}
    />, 
    {disableLifecycleMethods: true});
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('resultsPageToggle', () => {
    it('should set state of resultsPage to true when there are filtered restaurants', () => {
      wrapper.instance().resultsPageToggle();

      expect(wrapper.state('resultsPage')).toEqual(true);
    });
  });

  describe('handleSubmit', () => {
    it('should call storeLocation with the correct arguments if no address', async () => {
      wrapper.setState({
        latitude: 104.98,
        longitude: 45.22
      });

      wrapper.instance().findRadius = jest.fn();
      wrapper.instance().getAddress = jest.fn().mockImplementation(() => '1920 Market St')

      await wrapper.instance().handleSubmit();

      expect(wrapper.instance().props.storeLocation).toHaveBeenCalledWith('1920 Market St', 45.22, 104.98);
    });
  });

  describe('findRadius', () => {
    it('should call storeLocation with the correct arguments if no address', () => {
      wrapper.setState({
        latitude: 104.98,
        longitude: 45.22
      });
      wrapper.instance().storeRestaurants = jest.fn();

      const expected = [104.94376811594204, 105.01623188405797, 45.25623188405797, 45.18376811594203]

      wrapper.instance().findRadius();

      expect(wrapper.instance().storeRestaurants).toHaveBeenCalledWith(...expected);
    });
  });

  describe('storeRestaurants', () => {
    it('should call storeLocation with the correct arguments if no address', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve([{name: 'Brothers Bar', latitude: 100, longitude: 50}])
      }));

      wrapper.setState({
        latitude: 100.01,
        longitude: 50.1
      });
      wrapper.instance().storeHappyHours = jest.fn();

      const expected = [{"latitude": 100, "longitude": 50, "miles": 1.391249669, "name": "Brothers Bar"}];

      await wrapper.instance().storeRestaurants(99.999, 100.01, 49.99, 50.11);

      expect(wrapper.instance().props.storeFilteredRestaurants).toHaveBeenCalledWith(expected);
    });
  });
});