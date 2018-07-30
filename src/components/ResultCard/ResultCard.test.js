import React from 'react';
import { shallow } from 'enzyme';
import { ResultCard } from './ResultCard';

describe('ResultCard', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ResultCard />);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('secondsToTime', () => {
    it('should return an object with secs broken down into hours, minutes, and seconds', () => {
      const result = wrapper.instance().secondsToTime(30000);
      const expected = {
        hours: 8,
        minutes: 20,
        seconds: 0
      };

      expect(result).toEqual(expected);
    });
  });
});