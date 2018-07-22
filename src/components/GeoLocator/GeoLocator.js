import React from 'react';
import { geolocated } from 'react-geolocated';
import PropTypes from 'prop-types';
 
class GeoLocator extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? null
          : null;
  }
}

GeoLocator.propTypes = {
  isGeolocationAvailable: PropTypes.bool,
  isGeolocationEnabled: PropTypes.bool,
  coords: PropTypes.number,
};
 
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: null, 
  suppressLocationOnMount: true
})(GeoLocator);