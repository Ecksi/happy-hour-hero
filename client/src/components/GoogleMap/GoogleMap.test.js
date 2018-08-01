import React from 'react';
import { shallow } from 'enzyme';
import { GoogleMap } from './GoogleMap';

describe('GoogleMap', () => {
  let wrapper;
  let mockProps;
  let mockRestaurants;
  let mockHappyHours;

  beforeEach(() => {
    mockHappyHours = [{
      combined_times:'4:00PM-8:00PM',
      created_at:'2018-07-30T13:59:04.931Z',
      day:'Thursday',
      drink_specials_id:1,
      end_time:'2000',
      food_specials_id:1,
      id:1,
      restaurant_id:1,
      start_time:'1600',
      updated_at:'2018-07-30T13:59:04.931Z'
    },
    {
      combined_times:'4:00PM-8:00PM',
      created_at:'2018-07-30T13:59:04.931Z',
      day:'Monday',
      drink_specials_id:2,
      end_time:'2000',
      food_specials_id:2,
      id:2,
      restaurant_id:2,
      start_time:'1600',
      updated_at:'2018-07-30T13:59:04.931Z'
    }
    ];

    mockRestaurants =  [{
      id: 1, 
      name: 'Brothers Bar', 
      address: '1920 Market St', 
      phone: '(303) 297-2767', 
      website: 'http://www.brothersbar.com/denver-co/',
      city: 'Denver',
      created_at: '2018-07-30T13:59:04.919Z',
      latitude: '39.752816',
      longitude:'-104.993984',
      restaurant_image: 'http://www.brothersbar.com/wp-content/uploads/2015/10/GALLERY-Stapleton.jpg',
      state:'CO',
      updated_at: '2018-07-30T13:59:04.919Z',
      zip_code: 80202
    }];

    mockProps = {
      filteredRestaurants: mockRestaurants,
      happyHours: mockHappyHours,
      location: { 
        latitude: '50',
        longitude: '100',
      },
      day: 'Thursday'
    };
    wrapper = shallow(<GoogleMap {...mockProps} />, { disableLifecycleMethods: true });
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe(('todaysHappyHourRestaurants'), () => {
    it('should set state of todaysRestaurants', () => {
      wrapper.instance().todaysHappyHourRestaurants();

      expect(wrapper.state('todaysRestaurants')).toEqual(mockRestaurants);
    });
  });
});