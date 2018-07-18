import React, { Component } from 'react';
import './Home.css';
import homeLogo from './images/home-logo.png';
import LocationAutocomplete from 'location-autocomplete';
import { googleApiKey } from '../../apiCalls/apiKeys/googleApiKey';

class Home extends Component {
  constructor (props) {
    super(props);

    this.state = {
      city: '',
      state: ''
    };
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  onDropdownSelect = (component) => {
    const place = component.autocomplete.getPlace();
    const city = place.vicinity;
    const state = place.address_components[2].short_name;
    
    this.setState({
      city,
      state
    });
  }

  handleSubmit = () => {
    
    // this.props.history.push('/HappyHours');
  }

  render() {
    return (
      <section className="homeContainer">
        <img src={homeLogo} className="homeLogo" alt="Happy Hour Hero Logo" />
        <h2>Find your happy hour:</h2>
        <form className="homeSearchForm" onSubmit={this.handleSubmit}>
          <i className="fas fa-map-marker-alt"></i>
          <i className="fas fa-search"></i>
          <LocationAutocomplete
            name="zip"
            className="homeSearchInput" 
            placeholder="Enter a restaurant or location" 
            targetArea="City, State"
            locationType="(cities)" 
            googleAPIKey={googleApiKey}
            onChange={this.onChangeHandler}
            onDropdownSelect={this.onDropdownSelect}
          />
          <input className="homeSearchSubmit" type="submit" value="Submit" />
        </form>
      </section>
    );
  }
}

export default Home;
