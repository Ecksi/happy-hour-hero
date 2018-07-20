import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import GoogleMap from '../GoogleMap/GoogleMap';
import './HappyHours.css';
import { storeRestaurants, storeFilteredRestaurants } from '../../actions';
import geolib from 'geolib';


class HappyHours extends Component {
  constructor (props) {
    super(props);
    
  }

  async componentDidMount() {
    await this.getAllRestaurants();
    this.filterRestaurants();
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

  filterRestaurants = () => {
    const restaurants = [
      {name: 'Brothers', latitude: 39.752816, longitude: -104.993984},
      {name: 'Illegal Petes', latitude: 39.750870, longitude: -104.999999},
      {name: 'Hapa', latitude: 39.749750, longitude: -104.999919}
    ];
    
    const homeLatitude = this.props.location.latitude;
    const homeLongitude = this.props.location.longitude;
  
    const filteredRestaurants = [];

    const markers = restaurants.forEach(restaurant => {
      const meters = geolib.getDistance(
        {latitude: homeLatitude, longitude: homeLongitude},
        {latitude: restaurant.latitude, longitude: restaurant.longitude}
      );

      const miles = meters * 0.000621371;

      if (miles < 5) {
        filteredRestaurants.push(restaurant);
      }
    });

    this.props.storeFilteredRestaurants(filteredRestaurants);
  }

  render() {
    return (
      <section className="happyHoursContainer">
        <Header />
        <GoogleMap />
      </section>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  storeRestaurants: (restaurants) => {
    return dispatch(storeRestaurants(restaurants));
  },
  storeFilteredRestaurants: (restaurants) => {
    return dispatch(storeFilteredRestaurants(restaurants));
  }
});

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps, mapDispatchToProps)(HappyHours);
