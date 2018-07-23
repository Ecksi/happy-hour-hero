import React from 'react';
import { shallow } from 'enzyme';
import { ResultCards } from './ResultCards';

describe('ResultsCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ResultCards />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});