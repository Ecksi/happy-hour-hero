import React from 'react';
import { shallow } from 'enzyme';
import { Restaurant, mapDispatchToProps } from './Restaurant';

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
    },
    {
      combined_times:"4:00PM-8:00PM",
      created_at:"2018-07-30T13:59:04.931Z",
      day:"Monday",
      drink_specials_id:2,
      end_time:"2000",
      food_specials_id:2,
      id:2,
      restaurant_id:2,
      start_time:"1600",
      updated_at:"2018-07-30T13:59:04.931Z"
    }
    ];

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

    wrapper = shallow(<Restaurant location={{name: 'Denver, CO'}}/>, { disableLifecycleMethods: true });
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('formatAddress', () => {
    it('should return the address in the correct format', () => {
      const mockAddress = 'Falling Rock Brewery Denver, CO';
      const expected = 'falling+rock+brewery+denver+co';
      const result = wrapper.instance().formatAddress(mockAddress);

      expect(result).toEqual(expected);
    });
  });

  describe('findDay', () => {
    it('should return the name of the day', () => {
      const mockDate = new Date('08 02 2018');
      global.Date = jest.fn(() => mockDate);
    
      wrapper.instance().findDay();

      expect(wrapper.state('day')).toEqual('Thursday');
    });
  });

  describe('getRestaurantBySlug', () => {
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          mockRestaurant
        })
      }));

      wrapper.instance().getTodaysHappyHours = jest.fn();
    });

    it('should fetch url with the correct arguments', async () => {
      Object.defineProperty(location, 'search', {
        value: 'http://localhost:3001/restaurant?name=Brothers+Bar',
        writable: true,
      });

      const expected = "http://localhost:3001/api/v1/restaurants?name=Brothers+Bar";

      await wrapper.instance().getRestaurantBySlug();

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });
  });

  describe('getTodaysHappyHours', () => {
    beforeEach(() => {
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

      const expected = 'http://localhost:3001/api/v1/happy_hours?restaurant_id=1&day=Thursday';
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
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockDrinkSpecials)
      }));

      wrapper.instance().getFoodSpecials = jest.fn();
      wrapper.setState({
        todaysHappyHours: mockHappyHours
      });
    });

    it('should fetch url with the correct arguments', async () => {
      const expected = 'http://localhost:3001/api/v1/drink_specials/1';
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
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockFoodSpecials)
      }));

      wrapper.instance().cleanHappyHourTimes = jest.fn();
      wrapper.setState({
        todaysHappyHours: mockHappyHours
      });
    });

    it('should fetch url with the correct arguments', async () => {
      const expected = 'http://localhost:3001/api/v1/food_specials/1';
      await wrapper.instance().getFoodSpecials();

      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should set state of foodSpecials to all food specials', async () => {
      await wrapper.instance().getFoodSpecials();

      expect(wrapper.state('foodSpecials')).toEqual(mockFoodSpecials);
    });
  });

  describe('cleanHappyHourTimes', () => {
    it('should set state of joinedTimes to the combined hh time', () => {
      wrapper.instance().getHappyHourSpecialsForTime= jest.fn();
      wrapper.setState({
        todaysHappyHours: mockHappyHours
      });

      wrapper.instance().cleanHappyHourTimes();

      expect(wrapper.state('joinedTimes')).toEqual('4:00PM-8:00PM');
    });
  });

  // Not sure how to test that it renders and array of components
  describe('getHappyHourSpecialsForTime', () => {
    beforeEach(() => {
      wrapper.instance().getBestDrinkSpecial = jest.fn();
      wrapper.setState({
        todaysHappyHours: mockHappyHours,
        drinkSpecials: mockDrinkSpecials,
        foodSpecials: mockFoodSpecials
      });
    });

    it.skip('should return an array of RestaurantHappyHour components', () => {
      wrapper.instance().getHappyHourSpecialsForTime();

      expect(wrapper.state('specials')).toBe(SimpleComponent);
    });

    it('should not add restaurant happy hour to array if time has been added', () => {
      wrapper.instance().getHappyHourSpecialsForTime();

      expect(wrapper.state('specials').length).toEqual(2);
    });
  });

  describe('getBestDrinkSpecial ', () => {
    it('should set state of bestDrinkSpecial to the matching best_deal special', () => {
      wrapper.instance().getBestFoodSpecial= jest.fn();
      wrapper.setState({
        drinkSpecials: mockDrinkSpecials
      });

      wrapper.instance().getBestDrinkSpecial();

      expect(wrapper.state('bestDrinkSpecial')).toEqual('2-for-1 drinks');
    });

    it('should return null if no best drink special', () => {
      wrapper.instance().getBestFoodSpecial= jest.fn();
      wrapper.setState({
        drinkSpecials: [{name: "$30 Margs", best_deal: false}]
      });

      wrapper.instance().getBestDrinkSpecial();

      expect(wrapper.state('bestDrinkSpecial')).toEqual('');
    });
  });

  describe('getBestFoodSpecial ', () => {
    it('should set state of bestFoodSpecial to the matching best_deal special', () => {
      wrapper.setState({
        foodSpecials: mockFoodSpecials
      });

      wrapper.instance().getBestFoodSpecial();

      expect(wrapper.state('bestFoodSpecial')).toEqual('$3 tacos');
    });

    it('should return null if no best food special', () => {
      wrapper.setState({
        foodSpecials: [{name: "$24 tacos", best_deal: false}]
      });

      wrapper.instance().getBestFoodSpecial();

      expect(wrapper.state('bestFoodSpecial')).toEqual('');
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the correct params on storeDay', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockDay = 'Thursday';
      const mockAction = {
        type: 'STORE_DAY',
        day: mockDay
      };

      mappedProps.storeDay(mockDay);

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });
  });
});