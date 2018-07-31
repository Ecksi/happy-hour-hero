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
      endTime: '1800',
      restaurantName: 'Ale House'
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

  describe('getRemainingTime', () => {
    it('should set state to remaining seconds', () => {
      const mockedDate = new Date(2017, 11, 10);

      global.Date = jest.fn(() => mockedDate);
      global.Date.getFullYear = '2018';
      global.Date.getMonth = 'July';
      global.Date.geDate = '07302018';
      global.Date.now = jest.fn(() => '07302018');

      wrapper.instance().getRemainingTime();

      expect(wrapper.state('seconds')).toEqual(1512881897.982);
    });
  });

  describe('countDown', () => {
    it.skip('should call secondsToTime with the correct argument', () => {
      wrapper.setState({
        seconds: 8000
      });

      expect(wrapper.state('seconds')).toEqual(8000);

      wrapper.instance().countDown();

      wrapper.instance().secondsToTime = jest.fn();
      const result = wrapper.instance().secondsToTime;

      expect(result).toHaveBeenCalledWith(1000);
    });
  });

  describe('handleMoreInfoClick', () => {
    it('should dispatch storeRestaurantId', () => { });
  });


});