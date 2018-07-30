import React from 'react';
import { shallow } from 'enzyme';
import { UserMarker, mapStateToProps } from './UserMarker';

describe('UserMarker', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      location: []
    };
    wrapper = shallow(<UserMarker />);
  });

  it('matches the snapshot', () => {
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