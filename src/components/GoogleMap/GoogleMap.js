import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import './GoogleMap.css';
import UserMarker from '../UserMarker/UserMarker';
import RestaurantMarker from '../RestaurantMarker/RestaurantMarker';
import geolib from 'geolib';
import { storeRestaurants } from '../../actions';

class GoogleMap extends Component {
  constructor() {
    super();

    this.state = {
      zoom: 11
    };
  }

  async componentDidMount() {
    await this.getAllRestaurants();
  }

  getAllRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/restaurants');
      const restaurants = await response.json();

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      this.props.storeRestaurants(restaurants)
    } catch (error) {
      throw new Error(`Network request failed. (error: ${error.message})`);
    }
  }
  
  render() {
    const center = {
      lat: this.props.location.latitude,
      lng: this.props.location.longitude
    };

    const distance = geolib.getDistance(
      {latitude: 39.752912, longitude: -104.993983},
      {latitude: 39.750801, longitude: -104.996595}
    );

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

export const mapDispatchToProps = (dispatch) => ({
  storeRestaurants: (restaurants) => {
    return dispatch(storeRestaurants(restaurants));
  }
});

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);
