import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './RestaurantHappyHours.css';

class RestaurantHappyHours extends Component {
  getHappyHourSpecialsForTime = (happyHourTimes) => {
    const drinkSpecials = happyHourTimes.map((time, index) => {
      return (
        <div key={index}>
          <h3>Food Specials</h3>
          <p>Food 1</p>
        </div>
      );
    });

    return drinkSpecials;
  }

  render() {
    const restaurant = this.props.getRestaurant();
    const happyHours = this.props.getTodaysHappyHours(restaurant);
    const happyHourTimes = this.props.cleanHappyHourTimes(happyHours);
    const drinkSpecials = this.getHappyHourSpecialsForTime(happyHours);

    return (
      <section className="restaurantHappyHoursContainer">
        <h2>4:00pm - 8:00pm</h2>
        {drinkSpecials}
      </section>
    );
  }
}

RestaurantHappyHours.propTypes = {
  getRestaurant: PropTypes.func,
  getTodaysHappyHours: PropTypes.func,
  cleanHappyHourTimes: PropTypes.func,
};

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps)(RestaurantHappyHours);
