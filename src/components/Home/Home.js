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

  onDropdownSelect = (component) => {
    const { zip } = this.state;
    console.log('1')
    if (isNaN(zip)) {
      console.log('2')
      const place = component.autocomplete.getPlace();
      const city = place.vicinity;
      const state = place.address_components[2].short_name;
      console.log(city)
      this.setState({
        city,
        state
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { city, state, zip } = this.state;

    if (city === 'Denver' && state === 'CO') {
      this.props.storeLocation(null, null, null, -104.996595, 39.750801);
    } else {
      this.props.storeLocation(city, state, zip);
    }

    this.props.history.push('/HappyHours');
  }

  getInnerRef = (ref) => {
    this.innerRef = ref;
  }

  getLocation = async () => {
    this.innerRef && this.innerRef.getLocation();
    
    setTimeout(() => {
      const { longitude, latitude } = this.innerRef.state.coords;

      this.props.storeLocation(null, null, null, longitude, latitude);
      this.props.history.push('/HappyHours');
    }, 5000);
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
  storeLocation: (city, state, zip, longitude, latitude) => {
    return dispatch(storeLocation(city, state, zip, longitude, latitude));
  }
});

export default connect(null, mapDispatchToProps)(Home);
