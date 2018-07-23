import React from 'react';
import { shallow } from 'enzyme';
import { UserMarker } from './UserMarker';

describe('UserMarker', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserMarker />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});