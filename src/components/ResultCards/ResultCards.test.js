import React from 'react';
import { shallow } from 'enzyme';
import { ResultCards } from './ResultCards';

describe('ResultsCard', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      filteredRestaurants: [],
      happyHours: [],
      day: 'Today',
      drinkSpecials: [],
      foodSpecials: [],
    };
    wrapper = shallow(<ResultCards {...mockProps} />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});