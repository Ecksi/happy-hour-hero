import React from 'react';
import { shallow } from 'enzyme';
import { Home } from './Home';

describe('Home', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      storeDay: jest.fn(),
    };
    wrapper = shallow(<Home {...mockProps} />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});