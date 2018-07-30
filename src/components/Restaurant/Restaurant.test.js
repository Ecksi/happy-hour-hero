import React from 'react';
import { shallow } from 'enzyme';
import { Restaurant } from './Restaurant';

describe('Restaurant', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Restaurant />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});