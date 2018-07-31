import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './RestaurantHappyHours.css';

export class RestaurantHappyHours extends Component {
  getDrinkSpecials = () => {
    let drinkSpecials = [];
  
    this.props.todaysHappyHours.forEach(happyHour => {
      if (happyHour.combined_times === this.props.times) {
        this.props.hourlyDrinkSpecials.forEach(drinkSpecial => {
          if (drinkSpecial.id === happyHour.drink_specials_id && !drinkSpecials.includes(drinkSpecial.name)) {
            drinkSpecials.push(drinkSpecial.name);
          }
        });
      }
    });

    return drinkSpecials;
  }

  getFoodSpecials = () => {
    let foodSpecials = [];
  
    this.props.todaysHappyHours.forEach(happyHour => {
      if (happyHour.combined_times === this.props.times) {
        this.props.hourlyFoodSpecials.forEach(foodSpecial => {
          if (foodSpecial.id === happyHour.food_specials_id && !foodSpecials.includes(foodSpecial.name)) {
            foodSpecials.push(foodSpecial.name);
          }
        });
      }
    });

    return foodSpecials;
  }

  render() {
    const drinkSpecials = this.getDrinkSpecials();
    const foodSpecials = this.getFoodSpecials();

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
  times: PropTypes.string,
  todaysHappyHours: PropTypes.array,
  hourlyDrinkSpecials: PropTypes.array,
  hourlyFoodSpecials: PropTypes.array,
};

export const mapStateToProps = (state) => ({
  location: state.location,
  drinkSpecials: state.drinkSpecials,
  foodSpecials: state.foodSpecials
});

export default connect(mapStateToProps)(RestaurantHappyHours);
