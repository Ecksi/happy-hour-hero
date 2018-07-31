import React from 'react';
import { shallow } from 'enzyme';
import { RestaurantInfo, mapStateToProps } from './RestaurantInfo';

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

  describe('mapStateToProps', () => {
    it('can access restaurantId from the store', () => {
      const restId = mockProps.restaurantId;
      const mockState = { restId };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(mockState);
    });

    it('can access filteredRestaurants from the store', () => {
      const filteredRests = mockProps.filteredRestaurants;
      const mockState = { filteredRests };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(mockState);
    });

    it('can access happyHours from the store', () => {
      const happyHour = mockProps.happyHours;
      const mockState = { happyHour };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(mockState);
    });

    it('can access the day from the store', () => {
      const today = mockProps.day;
      const mockState = { today };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(mockState);
    });

    it('can access drinkSpecials from the store', () => {
      const drinkSpecial = mockProps.drinkSpecials;
      const mockState = { drinkSpecial };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(mockState);
    });

    it('can access foodSpecials from the store', () => {
      const foodSpecial = mockProps.foodSpecials;
      const mockState = { foodSpecial };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(mockState);
    });
  });
});