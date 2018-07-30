import React from 'react';
import { shallow } from 'enzyme';
import { RestaurantInfo } from './RestaurantInfo';

describe('RestaurantInfo', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      name: 'never',
      address: 'gonna',
      restaurant_image: 'give',
      restaurant: 'you',
      joinedTimes: 'up',
      bestDrinkSpecial: 'neva',
      bestFoodSpecial: 'giv',
    };
    wrapper = shallow(<RestaurantInfo {...mockProps} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});