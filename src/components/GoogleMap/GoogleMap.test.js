import React from 'react';
import { shallow } from 'enzyme';
import { GoogleMap } from './GoogleMap';

describe('GoogleMap', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GoogleMap latitude='1' />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});