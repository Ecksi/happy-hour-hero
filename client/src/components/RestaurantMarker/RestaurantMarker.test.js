import React from 'react';
import { shallow } from 'enzyme';
import { RestaurantMarker } from './RestaurantMarker';

describe('RestaurantMarker', () => {
  let  wrapper;

  beforeEach(() => {
    wrapper = shallow(<RestaurantMarker id={3}/>);
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleClick', () => {
    it.skip('should remove selectedCard class from all cards before adding new ones', () => {
      const mockedEvent = { target: {
        closest: jest.fn().mockImplementation(() => <div id="1"></div>),
        getAttribute: jest.fn()
      } 
      }
      wrapper.instance().handleClick(mockedEvent)
    });
  });
});