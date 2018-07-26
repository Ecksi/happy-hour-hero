import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import RestaurantInfo from '../RestaurantInfo/RestaurantInfo';
import RestaurantHappyHours from '../RestaurantHappyHours/RestaurantHappyHours';
import ContactBar from '../ContactBar/ContactBar';
import PropTypes from 'prop-types';
import './Restaurant.css';
import { storeDay } from '../../actions';

class Restaurant extends Component {
  constructor() {
    super();

    this.state = {
      restaurant: null,
      todaysHappyHours: [],
      day: null,
      drinkSpecials: [],
      foodSpecials: [],
      joinedTimes: '',
      specials: [],
      bestDrinkSpecial: '',
      bestFoodSpecial: ''
    };
    
  }

  componentWillMount = async () => {
    this.getRestaurantBySlug();
    this.findDay();
  }

  formatAddress = (address) => {
    return address.replace(/\s+/g, '+').toLowerCase().replace(',', '');
  }

  findDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const date = new Date();
    const dayIndex = date.getDay();
    const day = days[dayIndex];

    this.setState({
      day
    });
  }


  getRestaurantBySlug = async () => {
    try {
      const restaurantSlug = window.location.search;
      const index = restaurantSlug.indexOf('=');
      let name = restaurantSlug.substring(index + 1);

      const response = await fetch(`http://localhost:3000/api/v1/restaurants?name=${name}`);
      const currentRestaurants = await response.json();
      const currentRestaurant = currentRestaurants[0];

      this.setState({
        restaurant: currentRestaurant
      }, this.getTodaysHappyHours );
    } catch (error) {
      console.log(error);
    }
  }

  getTodaysHappyHours = async () => {
    const { restaurant } = this.state;
    const { day } = this.state;
  
    const response = await fetch(`http://localhost:3000/api/v1/happy_hours?restaurant_id=${restaurant.id}&day=${day}`)
    const todaysHappyHours = await response.json();
    
    this.setState({
      todaysHappyHours
    }, this.getDrinkSpecials);
  }

  getDrinkSpecials = async () => {
    const { todaysHappyHours } = this.state;
    let drinkIds = [];

    const allDrinkSpecials = todaysHappyHours.map( async (happyHour) => {
      const id = happyHour.drink_specials_id;
      const response = await fetch(`http://localhost:3000/api/v1/drink_specials/${id}`);
      const drinkSpecial = await response.json();

      return drinkSpecial[0];
    });

    const result = await Promise.all(allDrinkSpecials);
    const drinkSpecials = result.reduce((specials, special) => {

      if (special !== undefined && !drinkIds.includes(special.id)) {
        drinkIds.push(special.id);
        specials.push(special);
      }

      return specials;
    }, []);

    this.setState({
      drinkSpecials
    }, this.getFoodSpecials);
  }

  getFoodSpecials = async () => {
    const { todaysHappyHours } = this.state;
    let foodIds = [];

    const allFoodSpecials = todaysHappyHours.map( async (happyHour) => {
      const id = happyHour.food_specials_id;
      const response = await fetch(`http://localhost:3000/api/v1/food_specials/${id}`);
      const foodSpecial = await response.json();

      return foodSpecial[0];
    });

    const result = await Promise.all(allFoodSpecials);
    const foodSpecials = result.reduce((specials, special) => {

      if (special !== undefined && !foodIds.includes(special.id)) {
        foodIds.push(special.id);
        specials.push(special);
      }

      return specials;
    }, []);

    this.setState({
      foodSpecials
    }, this.cleanHappyHourTimes);
  }


  cleanHappyHourTimes = () => {
    const { todaysHappyHours } = this.state;

    const cleanTimes = todaysHappyHours.reduce((times, happyHour) => {
      const { combined_times} = happyHour;

      if (!times.includes(combined_times)) {
        times.push(combined_times);
      }

      return times;
    }, []);
 
    const joinedTimes = cleanTimes.join(" & ");

    this.setState({
      joinedTimes
    }, this.getHappyHourSpecialsForTime);
  }

  getHappyHourSpecialsForTime = () => {
    const { todaysHappyHours, drinkSpecials, foodSpecials } = this.state;

    let times = [];

    const specials = todaysHappyHours.map(happyHour => {
      const { combined_times } = happyHour;

      if (!times.includes(combined_times)) {
        times.push(combined_times);
        return (
          <RestaurantHappyHours 
            times={ combined_times } 
            todaysHappyHours={ todaysHappyHours}
            hourlyDrinkSpecials={ drinkSpecials }
            hourlyFoodSpecials= { foodSpecials }
          />
        );
      }
    });

    this.setState({
      specials
    }, this.getBestDrinkSpecial);
  }


  getBestDrinkSpecial = () => {
    const { drinkSpecials } = this.state;

    const bestDrinkSpecial = drinkSpecials.find(special => {
      return special.best_deal === true;
    });

    if (bestDrinkSpecial) {
      this.setState({
        bestDrinkSpecial: bestDrinkSpecial.name
      }, this.getBestFoodSpecial);
    } else {
      this.getBestFoodSpecial();
      return null;
    }
  }

  getBestFoodSpecial = () => {
    const { foodSpecials } = this.state;

    const bestFoodSpecial = foodSpecials.find(special => {
      return special.best_deal === true;
    });

    if (bestFoodSpecial) {
      this.setState({
        bestFoodSpecial: bestFoodSpecial.name
      });
    } else {
      return null;
    }
  }

  render () {
    const { restaurant } = this.state;

    if (restaurant) {
      const { todaysHappyHours, joinedTimes, specials, bestDrinkSpecial, bestFoodSpecial } = this.state;
      const { address } = this.props.location;

      let currentLocation;
      let restaurantLocation = this.formatAddress(restaurant.name);

      address ? currentLocation = this.formatAddress(address) : currentLocation = 'Turing School of Software & Design';

      return (
        <section className="restaurantContainer">
          <Header />
          <RestaurantInfo 
            todaysHappyHours={todaysHappyHours} 
            joinedTimes={joinedTimes}
            restaurant={restaurant}
            bestDrinkSpecial={bestDrinkSpecial}
            bestFoodSpecial={bestFoodSpecial}
          />
          <ContactBar 
            restaurant={ restaurant }
            currentLocation={ currentLocation }
            restaurantLocation={ restaurantLocation }
          />
          <section className="restaurantSpecialsContainer">
            <h2>Happy Hours</h2>
            { specials }
          </section>
        </section>
      );
    } else {
      return null;
    }
    
  }
}

Restaurant.propTypes = {
  restaurantId: PropTypes.number,
  filteredRestaurants: PropTypes.array,
  happyHours: PropTypes.string,
  day: PropTypes.string,
};

export const mapDispatchToProps = (dispatch) => ({
  storeDay: (day) => {
    return dispatch(storeDay(day));
  },
});


export const mapStateToProps = (state) => ({
  location: state.location,
  happyHours: state.happyHours,
  restaurantId: state.restaurantId,
  filteredRestaurants: state.filteredRestaurants,
  day: state.day,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Restaurant));
