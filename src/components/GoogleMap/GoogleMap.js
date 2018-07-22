import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import './GoogleMap.css';
import UserMarker from '../UserMarker/UserMarker';
import RestaurantMarker from '../RestaurantMarker/RestaurantMarker';
import { restaurants } from '../../reducers/restaurants';

class GoogleMap extends Component {
  constructor() {
    super();

    this.state = {
      zoom: 15
    };
  }

  render() {
    const center = {
      lat: this.props.location.latitude,
      lng: this.props.location.longitude
    };
    

    const markers = this.props.filteredRestaurants.map((restaurant, index) => {
      const { latitude, longitude, name, id } = restaurant;

      return ( <RestaurantMarker
        lat={ latitude }
        lng={ longitude }
        key={ index }
        name={ name }
        id={ id }
      />);
    });

    return (
      <div className='google-map'>
        <GoogleMapReact
          defaultCenter={ center }
          defaultZoom={ this.state.zoom }>
          <UserMarker
            lat={ center.lat }
            lng={ center.lng }
          />
          { markers }
        </GoogleMapReact>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  location: state.location,
  filteredRestaurants: state.filteredRestaurants
});

export default connect(mapStateToProps)(GoogleMap);
