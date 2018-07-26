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
      drinkSpecials: null
    };
    
  }

  componentWillMount() {
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
    });
  }

  cleanHappyHourTimes = (todaysHappyHours) => {
    const cleanTimes = todaysHappyHours.reduce((times, happyHour) => {
      const { combined_times} = happyHour;

      if (!times.includes(combined_times)) {
        times.push(combined_times);
      }

      return times;
    }, []);

    return cleanTimes.join(" & ");
  }

  getHappyHourSpecialsForTime = (todaysHappyHours) => {
    let times = [];

    const specials = todaysHappyHours.map(happyHour => {
      const { combined_times } = happyHour;

      if (!times.includes(combined_times)) {
        times.push(combined_times);
        return (
          <RestaurantHappyHours 
            times={ combined_times } 
            todaysHappyHours={ this.state.todaysHappyHours}
          />
        );
      }
    });

    return specials;
  }

  getDrinkSpecials = async () => {
    const { todaysHappyHours } = this.state;
    let drinkSpecials = [];

    todaysHappyHours.forEach( async (happyHour) => {
      const id = happyHour.drink_specials_id;
      const response = await fetch(`http://localhost:3000/api/v1/drink_specials/${id}`);
      const drinkSpecial = await response.json();

      drinkSpecials.push(...drinkSpecial);
    });

  }

  getBestDrinkSpecial = () => {
    const { todaysHappyHours } = this.state;

    const bestDeal = todaysHappyHours.find(happyHour => {

    });

    // const { drinkSpecials } = this.props;

    // const bestDrinkSpecial = drinkSpecials.find(special => {
    //   return special.id === todaysHappyHour.drink_specials_id && special.best_deal === true;
    // });

    // if (bestDrinkSpecial) {
    //   return bestDrinkSpecial.name;
    // } else {
    //   return null;
    // }
  }

  getBestFoodSpecial = () => {
    // const { foodSpecials } = this.props;

    // const bestDrinkSpecial = foodSpecials.find(special => {
    //   return special.id === todaysHappyHour.drink_specials_id && special.best_deal === true;
    // });

    // if (bestDrinkSpecial) {
    //   return bestDrinkSpecial.name;
    // } else {
    //   return null;
    // }
  }

  render () {
    const { restaurant } = this.state;

    if (restaurant) {
      let currentLocation;
      let combinedTimes;
      let times;
      let drinkSpecials;
      let bestDrinkSpecial;
      let bestFoodSpecial;
      let todaysHappyHours;
      let restaurantLocation = this.formatAddress(restaurant.name);
      let address = this.props.location.address;

      if (address) {
        currentLocation = this.formatAddress(address);
      } else {
        currentLocation = 'Denver, CO';
      }
      
      todaysHappyHours = this.state.todaysHappyHours;

      if (this.state.todaysHappyHours) {
        drinkSpecials = this.getDrinkSpecials();
        console.log(drinkSpecials)
        times = this.getHappyHourSpecialsForTime(todaysHappyHours); 
        combinedTimes = this.cleanHappyHourTimes(todaysHappyHours);
        bestDrinkSpecial = this.getBestDrinkSpecial();
        bestFoodSpecial = this.getBestFoodSpecial(todaysHappyHours);
      }


      return (
        <section className="restaurantContainer">
          <Header />
          <RestaurantInfo 
            todaysHappyHours={todaysHappyHours} 
            combinedTimes={combinedTimes}
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
            { times }
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
