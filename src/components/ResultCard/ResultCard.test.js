import React from 'react';
import { shallow } from 'enzyme';
import ResultCard from './ResultCard';

describe('ResultCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ResultCard />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});