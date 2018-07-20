import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';
import homeLogo from './images/home-logo.png';
import LocationAutocomplete from 'location-autocomplete';
import SearchBar from '../SearchBar/SearchBar';
import { googleApiKey } from '../../apiCalls/apiKeys/googleApiKey';
import { storeLocation } from '../../actions';

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

    this.props.history.push('/HappyHours');
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
  }
});

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
