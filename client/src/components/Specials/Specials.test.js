import React from 'react';
import { shallow } from 'enzyme';
import { Specials, mapStateToProps } from './Specials';

describe('Specials', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      location: [],
    };
    wrapper = shallow(<Specials />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('can access locations from the store', () => {
      const location = mockProps.locations;
      const mockState = { location };
      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps).toEqual(mockState);
    });
  });
});