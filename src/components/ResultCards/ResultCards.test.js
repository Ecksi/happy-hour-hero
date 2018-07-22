import React from 'react';
import { shallow } from 'enzyme';
import ResultsCards from './ResultCards';

describe('ResultsCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ResultsCards />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});