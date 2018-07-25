import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './RestaurantHappyHours.css';

class RestaurantHappyHours extends Component {
  getDrinkSpecials = (happyHours) => {
    let drinkSpecials = [];

    happyHours.forEach(happyHour => {
      if (happyHour.combined_times === this.props.times) {
        this.props.drinkSpecials.forEach(drinkSpecial => {
          if (drinkSpecial.id === happyHour.drink_specials_id && !drinkSpecials.includes(drinkSpecial.name)) {
            drinkSpecials.push(drinkSpecial.name);
          }
        });
      }
    });

    return drinkSpecials;
  }

  getFoodSpecials = (happyHours) => {
    let foodSpecials = [];

    happyHours.forEach(happyHour => {
      if (happyHour.combined_times === this.props.times) {
        this.props.foodSpecials.forEach(foodSpecial => {
          if (foodSpecial.id === happyHour.food_specials_id && !foodSpecials.includes(foodSpecial.name)) {
            foodSpecials.push(foodSpecial.name);
          }
        });
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
        <h3>{ this.props.times }</h3>
        <section className="restaurantSpecials">
          <article className="restaurantDrinkSpecials special">
            <h4>Drinks</h4>
            { drinkSpecials.length ? drinkSpecials.map((special, index) => <p key={index}>{special}</p>) : <p>No drink specials</p> }
          </article>
          <article className="restaurantFoodSpecials special">
            <h4>Food</h4>
            { foodSpecials.length ? foodSpecials.map((special, index) => <p key={index}>{special}</p>) : <p>No food specials</p> }
          </article>
        </section>
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
