import React from 'react';
import { shallow } from 'enzyme';
import { RestaurantHappyHours } from './RestaurantHappyHours';

describe('RestaurantHappyHours', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      todaysHappyHours: [],
      hourlyDrinkSpecials: [],
      hourlyFoodSpecials: []
    };
    wrapper = shallow(<RestaurantHappyHours {...mockProps} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});