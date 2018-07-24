import React from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { classnames } from '../../helpers';
import { withRouter } from 'react-router-dom';
import geolib from 'geolib';
import { googleApiKey } from '../../apiCalls/apiKeys/googleApiKey';
import { storeLocation, storeRestaurants, storeFilteredRestaurants, storeHappyHours, storeDrinkSpecials, storeFoodSpecials } from '../../actions';
import PropTypes from 'prop-types';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      findLocationDropdown: false,
      autoDetectLocation: false,
      resultsPage: false
    };
  }

  componentDidMount() {
    this.getMyLocation();
    this.resultsPageToggle();
  }

  resultsPageToggle = () => {
    this.props.filteredRestaurants ? this.setState({resultsPage: true}) : null;
  }

  getMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          findLocationDropdown: true
        });
      });
    }
  }

  handleSubmit = async () => {
    const { latitude, longitude } = this.state;
    const { address } = this.props.location;

    if (!address) {
      const location = `${latitude} + ${longitude}`;
      const address = await this.getAddress(location);
      
      this.props.storeLocation(address, longitude, latitude);
    } 

    this.findRadius();
  }

  findRadius = () => {
    const miles = 2.5;
    const degreesDiff = miles / 69;
    const minLat = this.state.latitude - degreesDiff;
    const maxLat = this.state.latitude + degreesDiff;
    const minLong = this.state.longitude + degreesDiff;
    const maxLong = this.state.longitude - degreesDiff;

    this.storeRestaurants(minLat, maxLat, minLong, maxLong);
  }

  storeRestaurants = async (minLat, maxLat, minLong, maxLong) => {
    const response = await fetch(`http://localhost:3000/api/v1/restaurants/${minLat}/${maxLat}/${minLong}/${maxLong}`);
    const restaurants = await response.json();

    const homeLatitude = this.state.latitude;
    const homeLongitude = this.state.longitude;

    const filteredRestaurants = [];
 
    restaurants.forEach(restaurant => {
      const meters = geolib.getDistance(
        {latitude: homeLatitude, longitude: homeLongitude},
        {latitude: restaurant.latitude, longitude: restaurant.longitude}
      );

      const miles = meters * 0.000621371;

      if (miles < 5) {
        Object.assign(restaurant, {miles})
        filteredRestaurants.push(restaurant);
      }
    });

    this.props.storeFilteredRestaurants(filteredRestaurants);
    
    setTimeout(() => this.storeHappyHours(), 10);
  }

  storeHappyHours = async () => {
    const { filteredRestaurants } = this.props;
    await filteredRestaurants.forEach(async(restaurant) => {
      const id = restaurant.id;
      const response = await fetch(`http://localhost:3000/api/v1/happy_hours?restaurant_id=${id}`);
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

  handleAutolocateSubmit = async (event) => {
    event.preventDefault();

    const { latitude, longitude } = this.state;
    const location = `${latitude} + ${longitude}`;
    const address = await this.getAddress(location);
    
    this.setState({
      autoDetectLocation: true
    });

    this.props.storeLocation(address, longitude, latitude);
    
    this.findRadius();
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

    } catch (error) {
      throw new Error(`Network request failed. (error: ${error.message})`);
    }
  }

  handleChange = address => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: ''
    });
  };

  handleSelect = (selected) => {
    this.setState({ isGeocoding: true, address: selected, findLocationDropdown: false });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng
        });

        const { address, latitude, longitude } = this.state;
        
        this.props.storeLocation(address, longitude, latitude);
        this.handleSubmit();
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const { address } = this.state;

    return (
      <div>
        <section className="homeSearchForm" >
          <PlacesAutocomplete
            onChange={this.handleChange}
            value={address}
            onSelect={this.handleSelect}
            onError={this.handleError}
            shouldFetchSuggestions={address.length > 2}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => {
              return (
                <div className="searchBarContainer">
                  <div className="searchInputContainer">
                    <i className="fas fa-search"></i>
                    <input
                      {...getInputProps({
                        placeholder: 'Enter a restaurant or location',
                        className: 'searchInput'
                      })}
                    />
                  </div>
                  {suggestions.length > 0 && (
                    <div className="autocompleteContainer">
                      {suggestions.map(suggestion => {
                        const className = classnames('suggestionItem', {
                          'suggestionItem--active': suggestion.active,
                        });

                        return (
                          /* eslint-disable react/jsx-key */
                          <div
                            {...getSuggestionItemProps(suggestion, { className })}
                          >
                            <strong>
                              {suggestion.formattedSuggestion.mainText}
                            </strong>{' '}
                            <small>
                              {suggestion.formattedSuggestion.secondaryText}
                            </small>
                          </div>
                        );
                        /* eslint-enable react/jsx-key */
                      })}
                    </div>
                  )}
                </div>
              );
            }}
          </PlacesAutocomplete>
          <div className="findLocationDropdown" style={{display: this.state.findLocationDropdown ? 'block' : 'none' }}>
            <i className="fas fa-map-marker-alt" onClick={this.handleAutolocateSubmit} ></i>
            <a onClick={this.handleAutolocateSubmit}>Current Location</a>
          </div>
          <input className="homeSearchSubmit" type="submit" value="Submit" />
        </section>
      </div>
    );
  }
}

SearchBar.propTypes = {
  storeLocation: PropTypes.func,
  storeFilteredRestaurants: PropTypes.func,
  history: PropTypes.obj,
};

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
  happyHours: state.happyHours,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));
