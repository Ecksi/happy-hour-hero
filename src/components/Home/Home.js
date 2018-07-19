import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';
import homeLogo from './images/home-logo.png';
import LocationAutocomplete from 'location-autocomplete';
import { googleApiKey } from '../../apiCalls/apiKeys/googleApiKey';
import { storeLocation } from '../../actions';
import GeoLocator from '../GeoLocator/GeoLocator';

class Home extends Component {
  constructor (props) {
    super(props);

    this.state = {
      city: '',
      state: '',
      zip: '',
      findLocationDropdown: false
    };
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
    let latitude;
    let longitude;
    let location;

    event.preventDefault();
    const { city, state, zip } = this.state;

    if (city && state) {
      location = `${city}+${state}`;
    } else if (!isNaN(parseInt(zip)) && zip.length === 5) {
      location = zip;
    }

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleApiKey}`);
    const data = await response.json();
    latitude = data.results[0].geometry.location.lat;
    longitude = data.results[0].geometry.location.lng;

    this.props.storeLocation(city, state, zip, null, longitude, latitude);

    this.props.history.push('/HappyHours');
  }

  getInnerRef = (ref) => {
    this.innerRef = ref;
  }

  getLocation = () => {
    this.innerRef && this.innerRef.getLocation();
    
    setTimeout(async () => {
      const { longitude, latitude } = this.innerRef.state.coords;
   
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApiKey}`);
      const data = await response.json();
      const address = data.results[0].formatted_address;

      this.props.storeLocation(null, null, null, address, longitude, latitude);
      this.props.history.push('/HappyHours');
    }, 10000);
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
    const { getInnerRef, getLocation } = this;

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
          <div className="findLocationDropdown" style={{display: this.state.findLocationDropdown ? 'block' : 'none' }}>
            <GeoLocator ref={getInnerRef} />
            <i className="fas fa-map-marker-alt" onClick={this.getLocation} ></i>
            <a onClick={this.getLocation}>Current Location</a>
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
