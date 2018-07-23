import React from 'react';
import { shallow } from 'enzyme';
import { HappyHours } from './HappyHours';

describe('HappyHours', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<HappyHours address="yo mama" />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});