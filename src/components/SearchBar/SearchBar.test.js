import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  let  wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchBar />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});