import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './RestaurantInfo.css';
import borderImg from './assets/main-img-border.png';
import moment from 'moment';
import * as timeFormat from '../ResultCards/ResultCards';
moment().format();

class Restaurant extends Component {
  constructor (props) {
    super(props);

  }

  componentDidMount() {
    this.getRestaurant();
  }

  getRestaurant = () => {
    const { restaurantId, filteredRestaurants } = this.props;
    const id = restaurantId;

    const restaurant = filteredRestaurants.find(restaurant => restaurant.id == id);

    return restaurant;
  }

  getBestFoodSpecial = (todaysHappyHour) => {
    const { foodSpecials } = this.props;

    const bestFoodSpecial = foodSpecials.find(special => {
      return special.id === todaysHappyHour.food_specials_id && special.best_deal === true;
    });


    if (bestFoodSpecial) {
      return bestFoodSpecial.name;
    } else {
      return null;
    }
  }

  getBestDrinkSpecial = (todaysHappyHour) => {
    const { drinkSpecials } = this.props;

    const bestDrinkSpecial = drinkSpecials.find(special => {
      return special.id === todaysHappyHour.drink_specials_id && special.best_deal === true;
    });

    if (bestDrinkSpecial) {
      return bestDrinkSpecial.name;
    } else {
      return null;
    }
  }

  render() {
    const restaurant = this.getRestaurant();
    const happyHours = this.props.getTodaysHappyHours(restaurant);
    const happyHourTimes = this.props.cleanHappyHourTimes(happyHours);
    const bestDrinkSpecial = this.getBestDrinkSpecial(happyHours[0]);
    const bestFoodSpecial = this.getBestFoodSpecial(happyHours[0]);
    
    const { name, address, restaurant_image, miles, id } = restaurant;
    const backgroundImage = {backgroundImage: "url(" + restaurant_image + ")"};
    const borderBackground = {backgroundImage: "url(" + borderImg + ")"};

    return (
      <section className="restaurantInfoContainer" style={ backgroundImage }>
        <div className="restaurantImageBorder" style={ borderBackground }></div>
        <section className="restaurantInfo">
          <h1>{ name }</h1>
          <p className="restaurantAddress">{ address }</p>
          <h3>happy hour times</h3>
          <p className="times">{ happyHourTimes }</p>
          <div className="bestDeals">
            <p><em>best deal</em></p>
            { bestDrinkSpecial ? <p> {bestDrinkSpecial} </p> : null }
            { bestFoodSpecial ? <p> {bestFoodSpecial} </p> : null }
          </div>
        </section>
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  restaurantId: state.restaurantId,
  filteredRestaurants: state.filteredRestaurants,
  happyHours: state.happyHours,
  day: state.day,
  drinkSpecials: state.drinkSpecials,
  foodSpecials: state.foodSpecials
});

export default connect(mapStateToProps)(Restaurant);
