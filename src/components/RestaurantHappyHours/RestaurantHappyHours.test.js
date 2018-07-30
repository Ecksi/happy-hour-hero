import React from 'react';
import { shallow } from 'enzyme';
import { RestaurantHappyHours } from './RestaurantHappyHours';

describe('RestaurantHappyHours', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      todaysHappyHours: [
        {
          combined_times:'4:00PM-8:00PM',
          day: 'Monday',
          drink_specials_id: 5,
          end_time:'2000',
          food_specials_id: 4,
          id: 1,
          restaurant_id: 1,
          start_time:'1600',
        }
      ],
      hourlyDrinkSpecials: [
        {
          best_deal: true,
          id: 5,
          name: "2-for-1 drinks",
        }
      ],
      hourlyFoodSpecials: [
        {
          best_deal: true,
          id: 4,
          name: "$3 Tacos",
        }
      ],
      times: '4:00PM-8:00PM'
    };
    wrapper = shallow(<RestaurantHappyHours {...mockProps} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('getDrinkSpecials', () => {
    it('should return an array of drink specials', () => {
      const result = wrapper.instance().getDrinkSpecials();

      expect(result).toEqual(["2-for-1 drinks"]);
    });
  });

  describe('getFoodSpecials', () => {
    it('should return an array of food specials', () => {
      const result = wrapper.instance().getFoodSpecials();

      expect(result).toEqual(["$3 Tacos"]);
    });
  });
});