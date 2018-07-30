import React from 'react';
import { shallow } from 'enzyme';
import { Restaurant } from './Restaurant';

describe('Restaurant', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Restaurant />, { disableLifecycleMethods: true });
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('formatAddress', () => {
    beforeEach(() => {
      wrapper = shallow(<Restaurant />, { disableLifecycleMethods: true });
    });

    it('should return the address in the correct format', () => {
      const mockAddress = 'Falling Rock Brewery Denver, CO';
      const expected = 'falling+rock+brewery+denver+co';
      const result = wrapper.instance().formatAddress(mockAddress);

      expect(result).toEqual(expected);
    });
  });

  describe('findDay', () => {
    beforeEach(() => {
      wrapper = shallow(<Restaurant />, { disableLifecycleMethods: true });
    });

    it('should return the name of the day', () => {
      const mockDate = new Date('2016');
      global.Date = jest.fn(() => mockDate);
    
      wrapper.instance().findDay();

      expect(wrapper.state('day')).toEqual('Thursday');
    });
  });

  describe('getRestaurantBySlug', () => {
    beforeEach(() => {
      const mockRestaurant = {
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
        updated_at: "2018-07-30T13:59:04.919Z" , 
        zip_code: 80202
      };

      wrapper = shallow(<Restaurant />, { disableLifecycleMethods: true });
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          mockRestaurant
        })
      }));

      wrapper.instance().getTodaysHappyHours = jest.fn();
    });

    // not sure how to mock window.location
    it.skip('should fetch url with the correct arguments', async () => {

      Object.defineProperty(location, 'href', {
        value: 'http://localhost:3001/restaurant?name=Brothers+Bar',
        writable: true,
      });

      const expected = 'Brothers+Bar';

      await wrapper.instance().getRestaurantBySlug();

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });
  });

  describe('getTodaysHappyHours', () => {
    let mockHappyHours;
    let wrapper;

    beforeEach(() => {
      mockHappyHours = [{
        combined_times:"4:00PM-8:00PM",
        created_at:"2018-07-30T13:59:04.931Z",
        day:"Monday",
        drink_specials_id:1,
        end_time:"2000",
        food_specials_id:null,
        id:1,
        restaurant_id:1,
        start_time:"1600",
        updated_at:"2018-07-30T13:59:04.931Z"
      }];

      wrapper = shallow(<Restaurant location={{name: 'Denver, CO'}}/>, { disableLifecycleMethods: true });
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          mockHappyHours
        })
      }));

      wrapper.instance().formatAddress = jest.fn();
      wrapper.instance().getDrinkSpecials = jest.fn();
      wrapper.setState({
        restaurant: {id: 1}
      });
    });

    // One of the two tests below work but not both for some reason
    it.skip('should fetch url with the correct arguments', async () => {
      console.log(wrapper.state('restaurant'))
      const expected = 'http://localhost:3000/api/v1/happy_hours?restaurant_id=1&day=Thursday';
      await wrapper.instance().getTodaysHappyHours();

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it.skip('should set state to restaurants happy hour times', async () => {
      console.log(wrapper.state('restaurant'))

      const expected = { "mockHappyHours": mockHappyHours};
      await wrapper.instance().getTodaysHappyHours();

      expect(wrapper.state('todaysHappyHours')).toEqual(expected);
    });
  });

  describe('getDrinkSpecials', () => {
    let mockDrinkSpecials;
    let wrapper;

    beforeEach(() => {
      mockDrinkSpecials = [{
        best_deal: true,
        created_at: "2018-07-30T13:59:04.910Z",
        id: 1,
        name: "2-for-1 drinks",
        updated_at: "2018-07-30T13:59:04.910Z",
      }];

      wrapper = shallow(<Restaurant location={{name: 'Denver, CO'}}/>, { disableLifecycleMethods: true });
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          mockDrinkSpecials 
        })
      }));

      wrapper.instance().getFoodSpecials = jest.fn();
      wrapper.setState({
        todaysHappyHours: [{drink_specials_id: 1}]
      });
    });

    // One of the two tests below work but not both for some reason
    it('should fetch url with the correct arguments', async () => {
      const expected = 'http://localhost:3000/api/v1/drink_specials/1';
      await wrapper.instance().getDrinkSpecials();

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it.skip('should set state to restaurants happy hour times', async () => {
      const expected = { "mockHappyHours": mockHappyHours};
      await wrapper.instance().getDrinkSpecials();

      expect(wrapper.state('drinkSpecials')).toEqual(expected);
    });
  });
});