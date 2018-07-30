import React from 'react';
import { shallow } from 'enzyme';
import { ResultCard } from './ResultCard';

jest.mock('moment', () => () => ({format: () => '1700'}));

describe('ResultCard', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      startTime: '1200',
      endTime: '1800'
    };
    
    wrapper = shallow(<ResultCard {...mockProps}/>);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('secondsToTime', () => {
    it('should call this.countdown every second', () => {
      const result = wrapper.instance().secondsToTime(30000);
      const expected = {
        hours: 8,
        minutes: 20,
        seconds: 0
      };

      expect(result).toEqual(expected);
    });
  });

  describe('setTimeUntilRemaining', () => {
    it('should set state of currentlyHappyHour to true when happy hour is going on', () => {
      
      wrapper.instance().setTimeUntilRemaining();

      expect(wrapper.state('currentlyHappyHour')).toEqual(true);
    });

    it('should set state of currentlyHappyHour to false when happy hour is not going on', () => {
      mockProps.endTime = '1500';
      
      wrapper = shallow(<ResultCard {...mockProps}/>);

      wrapper.instance().setTimeUntilRemaining();

      expect(wrapper.state('currentlyHappyHour')).toEqual(false);
    });
  });
});