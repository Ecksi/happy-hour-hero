import React from 'react';
import { shallow } from 'enzyme';
import GeoLocator from './GeoLocator';

describe('GeoLocator', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GeoLocator />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});