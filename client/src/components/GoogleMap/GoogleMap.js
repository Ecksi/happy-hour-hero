import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import './GoogleMap.css';
import UserMarker from '../UserMarker/UserMarker';
import RestaurantMarker from '../RestaurantMarker/RestaurantMarker';
import PropTypes from 'prop-types';

export class GoogleMap extends Component {
  constructor() {
    super();

    this.state = {
      zoom: 16,
      todaysRestaurants: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.happyHours !== prevProps.happyHours) {
      this.todaysHappyHourRestaurants();
    }
  }

  componentDidMount() {
    if (this.props.happyHours) {
      this.todaysHappyHourRestaurants();
    }
  }

  todaysHappyHourRestaurants = () => {
    const todaysRestaurants = this.props.filteredRestaurants.reduce((restaurants, restaurant) => {
      this.props.happyHours.forEach((happyHour) => {
        if (happyHour.restaurant_id === restaurant.id && happyHour.day === this.props.day && !restaurants.includes(restaurant)) {
          restaurants.push(restaurant);
        }
      });

      return restaurants;
    }, []);

    this.setState({todaysRestaurants});
  }

  render() {
    let markers;

    const center = {
      lat: this.props.location.latitude,
      lng: this.props.location.longitude
    };

    if (this.state.todaysRestaurants) {
      markers = this.state.todaysRestaurants.map((restaurant, index) => {
        const { latitude, longitude, name, id } = restaurant;

        return (<RestaurantMarker
          lat={ latitude }
          lng={ longitude }
          key={ index }
          name={ name }
          id={ id }
        />);
      });

    }

    return (
      <div className='google-map'>
        <GoogleMapReact
          center={ center }
          defaultZoom={ this.state.zoom }>
          <UserMarker
            lat={ center.lat }
            lng={ center.lng }
          />
          { markers }
        </GoogleMapReact>
      </div>
    );
  }
}

GoogleMap.propTypes = {
  location: PropTypes.object,
  filteredRestaurants: PropTypes.array,
};

export const mapStateToProps = (state) => ({
  location: state.location,
  filteredRestaurants: state.filteredRestaurants,
  happyHours: state.happyHours,
  day: state.day
});

export default connect(mapStateToProps)(GoogleMap);
