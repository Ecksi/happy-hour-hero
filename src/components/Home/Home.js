import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';
import homeLogo from './images/home-logo.png';
import SearchBar from '../SearchBar/SearchBar';
import { googleApiKey } from '../../apiCalls/apiKeys/googleApiKey';
import { storeLocation, storeRestaurants, storeFilteredRestaurants, storeHappyHours, storeDrinkSpecials, storeFoodSpecials } from '../../actions';
import geolib from 'geolib';

class Home extends Component {
  constructor (props) {
    super(props);

    this.state = {
      latitude: '',
      longitude: '',
      findLocationDropdown: false
    };
  }

  componentDidMount() {
    this.getAllRestaurants();
    this.getMyLocation()
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { latitude, longitude } = this.state;
    const { address } = this.props.location;

    if (!address) {
      const location = `${latitude} + ${longitude}`;
      const address = await this.getAddress(location);
      
      this.props.storeLocation(address, longitude, latitude);
    } 

    this.filterRestaurants();
  }

  getMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    };
  }

  getAddress = async (location) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleApiKey}`);
    const data = await response.json();
    const address = data.results[0].formatted_address;

    return address;
  }

  getAllRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/restaurants');
      const restaurants = await response.json();

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      return restaurants;
      // this.props.storeRestaurants(restaurants)
    } catch (error) {
      throw new Error(`Network request failed. (error: ${error.message})`);
    }
  }

  filterRestaurants = async () => {
    const restaurants = await this.getAllRestaurants();
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

    setTimeout(() => this.storeHappyHours(), 10);
  }

  storeHappyHours = async () => {
    const { filteredRestaurants } = this.props;
    await filteredRestaurants.forEach(async(restaurant) => {
      const id = 12;
      const response = await fetch(`http://localhost:3000/api/v1/happy_hours/${id}`);
      const happyHour = await response.json();

      this.props.storeHappyHours(happyHour);
    });

    setTimeout(() => this.storeDrinkSpecials(), 100);
  }

  storeDrinkSpecials = async () => {
    const { happyHours } = this.props;
  
    await happyHours.forEach(async(happyHour) => {
      const id = happyHour.drink_specials_id;
      const response = await fetch(`http://localhost:3000/api/v1/drink_specials/${id}`);
      const drinkSpecial = await response.json();

      this.props.storeDrinkSpecials(drinkSpecial);
    });

    setTimeout(() => this.storeFoodSpecials(), 100);
  }

  storeFoodSpecials = async () => {
    const { happyHours } = this.props;
  
    await happyHours.forEach(async(happyHour) => {
      const id = happyHour.food_specials_id;
      const response = await fetch(`http://localhost:3000/api/v1/food_specials/${id}`);
      const foodSpecial = await response.json();

      this.props.storeFoodSpecials(foodSpecial);
    });

    this.props.history.push('/HappyHours');
  }

  render() {
    return (
      <section className="homeContainer">
        <img src={homeLogo} className="homeLogo" alt="Happy Hour Hero Logo" />
        <h2>Find your happy hour:</h2>
        <form className="homeSearchForm" onSubmit={this.handleSubmit}>
          <i className="fas fa-search"></i>
          <SearchBar />
          <div className="findLocationDropdown" style={{display: this.state.latitude ? 'block' : 'none' }}>
            <i className="fas fa-map-marker-alt" onClick={this.handleSubmit} ></i>
            <a onClick={this.handleSubmit}>Current Location</a>
          </div>
          <input className="homeSearchSubmit" type="submit" value="Submit" />
        </form>
      </section>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  storeLocation: (address, longitude, latitude) => {
    return dispatch(storeLocation(address, longitude, latitude));
  },
  storeRestaurants: (restaurants) => {
    return dispatch(storeRestaurants(restaurants));
  },
  storeFilteredRestaurants: (restaurants) => {
    return dispatch(storeFilteredRestaurants(restaurants));
  },
  storeHappyHours: (happyHour) => {
    return dispatch(storeHappyHours(happyHour));
  },
  storeDrinkSpecials: (drinkSpecial) => {
    return dispatch(storeDrinkSpecials(drinkSpecial));
  },
  storeFoodSpecials: (foodSpecial) => {
    return dispatch(storeFoodSpecials(foodSpecial));
  }
});

export const mapStateToProps = (state) => ({
  location: state.location,
  restaurants: state.restaurants,
  filteredRestaurants: state.filteredRestaurants,
  happyHours: state.happyHours
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
