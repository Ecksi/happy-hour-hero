import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

describe('Header', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      location: {address: 'Turing School Denver, CO'},
    };
    wrapper = shallow(<Header {...mockProps} />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleSubmit', () => {
    it('should set of dropdownSelected to true', () => {
      wrapper.instance().handleSubmit();

      expect(wrapper.state('dropdownSelected')).toEqual(true);
    });
  });

  describe('handleSelected', () => {
    it('should set of dropdownSelected to false', () => {
      wrapper.instance().handleSelected();

      expect(wrapper.state('dropdownSelected')).toEqual(false);
    });
  });
});