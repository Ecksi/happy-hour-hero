import React from 'react';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';
 
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
 
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: null, 
  suppressLocationOnMount: true
})(GeoLocator);