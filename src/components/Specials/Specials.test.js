import React from 'react';
import { shallow } from 'enzyme';
import { Specials } from './Specials';

describe('Specials', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Specials />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});