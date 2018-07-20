import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';
import homeLogo from './images/home-logo.png';
import LocationAutocomplete from 'location-autocomplete';
import { googleApiKey } from '../../apiCalls/apiKeys/googleApiKey';
import { storeLocation } from '../../actions';

class Home extends Component {
  constructor (props) {
    super(props);

    this.state = {
      city: '',
      state: '',
      zip: '',
      latitude: '',
      longitude: '',
      findLocationDropdown: false
    };
  }

  componentDidMount() {
    this.getMyLocation()
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;
    
    this.setState({
      [name]: value
    });
  }

  onDropdownSelect = async (component) => {
    const { zip } = this.state;

    if (isNaN(zip)) {
      const place = component.autocomplete.getPlace();
      const city = place.vicinity;
      const state = place.address_components[2].short_name;
     
      this.setState({
        city,
        state
      });
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { city, state, zip } = this.state;

    const location = await this.returnLocation();
    const latLng = await this.getLatLng(location);
    const address = await this.getAddress(location);
    
    this.props.storeLocation(city, state, zip, address, latLng.longitude, latLng.latitude);

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

  getLatLng = async (location) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleApiKey}`);
    const data = await response.json();
    const latitude = data.results[0].geometry.location.lat;
    const longitude = data.results[0].geometry.location.lng;

    return {latitude, longitude};
  }

  getAddress = async (location) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleApiKey}`);
    const data = await response.json();
    const address = data.results[0].formatted_address;

    return address;
  }

  returnLocation = async () => {
    let location;
    const { city, state, zip, latitude, longitude } = this.state;

    if (city && state) {
      location = `${city}+${state}`;
    } else if (!isNaN(parseInt(zip)) && zip.length === 5) {
      location = zip;
    } else {
      location = `${latitude} + ${longitude}`;
    }

    return location;
  }

  handleSearchInput = () => {
    if (this.state.zip === "") {
      this.setState({
        findLocationDropdown: true
      });
    } else {
      this.setState({
        findLocationDropdown: false
      });  
    }
  }

  render() {
    return (
      <section className="homeContainer">
        <img src={homeLogo} className="homeLogo" alt="Happy Hour Hero Logo" />
        <h2>Find your happy hour:</h2>
        <form className="homeSearchForm" onSubmit={this.handleSubmit}>
          <i className="fas fa-search"></i>
          <LocationAutocomplete
            name="zip"
            className="homeSearchInput" 
            placeholder="Enter a restaurant or location" 
            targetArea="City, State"
            locationType="(cities)" 
            googleAPIKey={googleApiKey}
            onChange={this.onChangeHandler}
            onKeyDown={this.handleSearchInput}
            onFocus={this.handleSearchInput}
            onDropdownSelect={this.onDropdownSelect}
          />
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
  storeLocation: (city, state, zip, address, longitude, latitude) => {
    return dispatch(storeLocation(city, state, zip, address, longitude, latitude));
  }
});

export default connect(null, mapDispatchToProps)(Home);
