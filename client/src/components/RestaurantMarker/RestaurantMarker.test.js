import React from 'react';
import { shallow } from 'enzyme';
import { RestaurantMarker } from './RestaurantMarker';

describe('RestaurantMarker', () => {
  let  wrapper;

  beforeEach(() => {
    wrapper = shallow(<RestaurantMarker id={3}/>);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});