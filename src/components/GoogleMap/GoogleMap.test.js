import React from 'react';
import { shallow } from 'enzyme';
import { GoogleMap } from './GoogleMap';

describe('GoogleMap', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      filteredRestaurants: [],
      location: { 
        latitude: '1',
        longitude: '1',
      }
    };
    wrapper = shallow(<GoogleMap latitude='1' {...mockProps} />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});