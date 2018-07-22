import React from 'react';
import { shallow } from 'enzyme';
import RestaurantMarker from './RestaurantMarker';

describe('RestaurantMarker', () => {
  let  wrapper;

  beforeEach(() => {
    wrapper = shallow(<RestaurantMarker />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});