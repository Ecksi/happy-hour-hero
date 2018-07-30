import React from 'react';
import { shallow } from 'enzyme';
import { ContactBar } from './ContactBar';

describe('ContactBar', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      restaurant: {
        phone: '(123) 456-7890',
        website: 'www.com',
      }
    };
    wrapper = shallow(<ContactBar {...mockProps} />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});