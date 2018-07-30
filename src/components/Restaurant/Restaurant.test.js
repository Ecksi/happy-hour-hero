import React from 'react';
import { shallow } from 'enzyme';
import { Restaurant } from './Restaurant';

describe('Restaurant', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Restaurant />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('formatAddress', () => {
    beforeEach(() => {
      wrapper = shallow(<Restaurant />);
    });

    it('should return the address in the correct format', async () => {
      const mockAddress = 'Falling Rock Brewery Denver, CO'
      const expected = 'falling+rock+brewery+denver+co';
      const result = wrapper.instance().formatAddress(mockAddress);

      expect(result).toEqual(expected);
    });
  });

  describe('findDay', () => {
    beforeEach(() => {
      wrapper = shallow(<Restaurant />);
    });

    it('should return todays date', async () => {
      const mockDate = new Date('2016');
      global.Date = jest.fn(() => mockDate);
    
      wrapper.instance().findDay();

      expect(wrapper.state('day')).toEqual('Thursday');
    });
  });

});