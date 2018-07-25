import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './RestaurantHappyHours.css';

class RestaurantHappyHours extends Component {
  getDrinkSpecials = (happyHours) => {
    const drinkSpecials = happyHours.map(happyHour => {
      if (happyHour.combined_times === this.props.times) {
        const allSpecials = this.props.drinkSpecials.reduce((specials, drinkSpecial) => {
          if (drinkSpecial.id === happyHour.drink_specials_id && !specials.includes(drinkSpecial.name)) {
            specials.push(drinkSpecial.name);
          }

          return specials;
        }, []);

        return allSpecials;
      }
    });

    return drinkSpecials;
  }

  getFoodSpecials = (happyHours) => {
    const foodSpecials = happyHours.map(happyHour => {
      if (happyHour.combined_times === this.props.times) {
        const allSpecials = this.props.foodSpecials.reduce((specials, foodSpecial) => {
          if (foodSpecial.id === happyHour.food_specials_id && !specials.includes(foodSpecial.name)) {
            specials.push(foodSpecial.name);
          }

          return specials;
        }, []);

        return allSpecials;
      }
    });

    return foodSpecials;
  }

  render() {
    const { times } = this.props;
    const happyHours = this.props.getTodaysHappyHours();
    const drinkSpecials = this.getDrinkSpecials(happyHours);
    const foodSpecials = this.getFoodSpecials(happyHours);

    return (
      <section className="restaurantHappyHoursContainer">
        <h2>{ this.props.times }</h2>
        <h3>Drinks</h3>
        <p>{ drinkSpecials} </p>
        <h3>Food</h3>
        <p>{ foodSpecials} </p>

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
  location: state.location,
  drinkSpecials: state.drinkSpecials,
  foodSpecials: state.foodSpecials
});

export default connect(mapStateToProps)(RestaurantHappyHours);
