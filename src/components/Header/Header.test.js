import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

describe('Header', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      location: {address: 'some where'},
    };
    wrapper = shallow(<Header {...mockProps} />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});