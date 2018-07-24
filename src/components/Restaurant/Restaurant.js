import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Restaurant.css';
import Header from '../Header/Header';
import RestaurantInfo from '../RestaurantInfo/RestaurantInfo';
import ContactBar from '../ContactBar/ContactBar';

class Restaurant extends Component {
  constructor (props) {
    super(props);
  }

  getTodaysHappyHours = (restaurant) => {
    const { happyHours, day } = this.props;

    const todaysHappyHours = happyHours.reduce((happyHourTimes, happyHour) => {
      if (happyHour.restaurant_id === restaurant.id && happyHour.day === day) {
        happyHourTimes.push(happyHour)
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

  render() {
    return (
      <section className="restaurantContainer">
        <Header />
        <RestaurantInfo 
          getTodaysHappyHours={this.getTodaysHappyHours} 
          cleanHappyHourTimes={this.cleanHappyHourTimes}
        />
        <ContactBar />
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  location: state.location,
  happyHours: state.happyHours,
  restaurantId: state.restaurantId,
  day: state.day
});

export default withRouter(connect(mapStateToProps)(Restaurant));
