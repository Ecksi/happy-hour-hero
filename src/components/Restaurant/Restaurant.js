import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import RestaurantInfo from '../RestaurantInfo/RestaurantInfo';
import RestaurantHappyHours from '../RestaurantHappyHours/RestaurantHappyHours';
import ContactBar from '../ContactBar/ContactBar';
import PropTypes from 'prop-types';
import './Restaurant.css';

class Restaurant extends Component {
    getRestaurant = () => {
      const { restaurantId, filteredRestaurants } = this.props;
      const id = restaurantId;
      const restaurant = filteredRestaurants.find(restaurant => restaurant.id == id);

      return restaurant;
    }

  getTodaysHappyHours = () => {
    const restaurant = this.getRestaurant();
    const { happyHours, day } = this.props;
    

    const todaysHappyHours = happyHours.reduce((happyHourTimes, happyHour) => {
      if (happyHour.restaurant_id === restaurant.id && happyHour.day === day) {
        happyHourTimes.push(happyHour);
      }
      return happyHourTimes;
    }, []);
    
    return todaysHappyHours;
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

  getHappyHourSpecialsForTime = () => {
    const happyHours = this.getTodaysHappyHours();
    let times = [];

    const specials = happyHours.map(happyHour => {
      const { combined_times } = happyHour;

      if (!times.includes(combined_times)) {
        times.push(combined_times);
        return (
          <RestaurantHappyHours 
            times={ combined_times } 
            getTodaysHappyHours={ this.getTodaysHappyHours}
          />
        );
      }
    });

    console.log(times)
    return specials;
  }

  render() {
    const times = this.getHappyHourSpecialsForTime();
    return (
      <section className="restaurantContainer">
        <Header />
        <RestaurantInfo 
          getTodaysHappyHours={this.getTodaysHappyHours} 
          cleanHappyHourTimes={this.cleanHappyHourTimes}
          getRestaurant={this.getRestaurant}
        />
        <ContactBar />
        { times }
      </section>
    );
  }
}

Restaurant.propTypes = {
  restaurantId: PropTypes.number,
  filteredRestaurants: PropTypes.array,
  happyHours: PropTypes.string,
  day: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  location: state.location,
  happyHours: state.happyHours,
  restaurantId: state.restaurantId,
  filteredRestaurants: state.filteredRestaurants,
  day: state.day,
});

export default withRouter(connect(mapStateToProps)(Restaurant));
