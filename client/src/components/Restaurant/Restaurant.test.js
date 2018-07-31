import React from 'react';
import { shallow } from 'enzyme';
import { Restaurant } from './Restaurant';

describe('Restaurant', () => {
  let wrapper;
  let mockHappyHours;
  let mockRestaurant;
  let mockDrinkSpecials;
  let mockFoodSpecials;

  beforeEach(() => {
    mockHappyHours = [{
      combined_times:"4:00PM-8:00PM",
      created_at:"2018-07-30T13:59:04.931Z",
      day:"Monday",
      drink_specials_id:1,
      end_time:"2000",
      food_specials_id:1,
      id:1,
      restaurant_id:1,
      start_time:"1600",
      updated_at:"2018-07-30T13:59:04.931Z"
    }];

    mockRestaurant = {
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
      updated_at: "2018-07-30T13:59:04.919Z",
      zip_code: 80202
    };

    mockDrinkSpecials = [{
      best_deal: true,
      created_at: "2018-07-30T13:59:04.910Z",
      id: 1,
      name: "2-for-1 drinks",
      updated_at: "2018-07-30T13:59:04.910Z",
    }];

    mockFoodSpecials = [{
      best_deal: true,
      created_at: "2018-07-30T13:59:04.910Z",
      id: 1,
      name: "$3 tacos",
      updated_at: "2018-07-30T13:59:04.910Z",
    }];

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
      const mockDate = new Date('08 02 2018');
      global.Date = jest.fn(() => mockDate);
    
      wrapper.instance().findDay();

      expect(wrapper.state('day')).toEqual('Thursday');
    });
  });

  describe('getRestaurantBySlug', () => {
    beforeEach(() => {
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
    let wrapper;

    beforeEach(() => {
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

    it('should fetch url with the correct arguments', async () => {
      wrapper.setState({
        day: 'Thursday'
      });

      const expected = 'http://localhost:3000/api/v1/happy_hours?restaurant_id=1&day=Thursday';
      await wrapper.instance().getTodaysHappyHours();

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should set state to restaurants happy hour times', async () => {
      const expected = { "mockHappyHours": mockHappyHours};
      await wrapper.instance().getTodaysHappyHours();

      expect(wrapper.state('todaysHappyHours')).toEqual(expected);
    });
  });

  describe('getDrinkSpecials', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Restaurant location={{name: 'Denver, CO'}}/>, { disableLifecycleMethods: true });
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockDrinkSpecials)
      }));

      wrapper.instance().getFoodSpecials = jest.fn();
      wrapper.setState({
        todaysHappyHours: mockHappyHours
      });
    });

    it('should fetch url with the correct arguments', async () => {
      const expected = 'http://localhost:3000/api/v1/drink_specials/1';
      await wrapper.instance().getDrinkSpecials();

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should set state to restaurants happy hour times', async () => {
      await wrapper.instance().getDrinkSpecials();

      expect(wrapper.state('drinkSpecials')).toEqual(mockDrinkSpecials);
    });

    it('should set state to restaurants happy hour times', async () => {
      await wrapper.instance().getDrinkSpecials();

      expect(wrapper.state('drinkSpecials')).toEqual(mockDrinkSpecials);
    });
  });

  describe('getFoodSpecials', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Restaurant location={{name: 'Denver, CO'}}/>, { disableLifecycleMethods: true });
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockFoodSpecials)
      }));

      wrapper.instance().cleanHappyHourTimes = jest.fn();
      wrapper.setState({
        todaysHappyHours: mockHappyHours
      });
    });

    it('should fetch url with the correct arguments', async () => {
      const expected = 'http://localhost:3000/api/v1/food_specials/1';
      await wrapper.instance().getFoodSpecials();

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should set state to restaurants happy hour times', async () => {
      await wrapper.instance().getFoodSpecials();

      expect(wrapper.state('foodSpecials')).toEqual(mockFoodSpecials);
    });

    it('should set state to restaurants happy hour times', async () => {
      await wrapper.instance().getFoodSpecials();

      expect(wrapper.state('foodSpecials')).toEqual(mockFoodSpecials);
    });
  });
});