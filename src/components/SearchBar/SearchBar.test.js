import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './SearchBar';

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
    />, 
    {disableLifecycleMethods: true});
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('resultsPageToggle', () => {
    it.skip('should set state of resultsPage to true when there are filtered restaurants', () => {
      console.log(wrapper.instance().resultsPageToggle)

      expect(wrapper.state('resultsPage')).toEqual('CO');
    });
  });


  describe('getMyLocation', () => {
    it.skip('should set state of latitude, longitude and change findLocationDropdown to true', () => {
      wrapper.instance().getMyLocation();

      expect(wrapper.state('latitude')).toEqual('CO');
    });
  });
});