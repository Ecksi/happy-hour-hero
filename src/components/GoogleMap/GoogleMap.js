import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import './GoogleMap.css';
import UserMarker from '../UserMarker/UserMarker';
import RestaurantMarker from '../RestaurantMarker/RestaurantMarker';

class GoogleMap extends Component {
  constructor() {
    super();

    this.state = {
      zoom: 11
    };
  }
  
  render() {
    const center = {
      lat: this.props.location.latitude,
      lng: this.props.location.longitude
    };

    return (
      <div className='google-map'>
        <GoogleMapReact
          defaultCenter={ center }
          defaultZoom={ this.state.zoom }>
          <UserMarker
            lat={ center.lat }
            lng={ center.lng }
          />
          <RestaurantMarker
            lat={ center.lat + 0.02 }
            lng={ center.lng + 0.02 }
          />
        </GoogleMapReact>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps)(GoogleMap);