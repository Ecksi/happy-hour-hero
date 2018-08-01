import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './RestaurantInfo.css';
import borderImg from './assets/main-img-border.png';
import moment from 'moment';
moment().format();

export class RestaurantInfo extends Component {  
  render() {
    const { restaurant, joinedTimes, bestDrinkSpecial, bestFoodSpecial } = this.props;
    const { name, address, restaurant_image } = restaurant;
    const backgroundImage = {backgroundImage: "url(" + restaurant_image + ")"};
    const borderBackground = {backgroundImage: "url(" + borderImg + ")"};

    return (
      <section className="restaurantInfoContainer" style={ backgroundImage }>
        <div className="restaurantImageBorder" style={ borderBackground }></div>
        <section className="restaurantInfo">
          <h1>{ name }</h1>
          <p className="restaurantAddress">{ address }</p>
          <h3>happy hour times</h3>
          <p className="times">{ joinedTimes }</p>
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

RestaurantInfo.propTypes = {
  foodSpecials: PropTypes.array,
  drinkSpecials: PropTypes.array,
  getRestaurant: PropTypes.func,
  getTodaysHappyHours: PropTypes.func,
  cleanHappyHourTimes: PropTypes.func,
  restaurant: PropTypes.object,
  joinedTimes: PropTypes.string,
  bestDrinkSpecial: PropTypes.string,
  bestFoodSpecial: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  restaurantId: state.restaurantId,
  filteredRestaurants: state.filteredRestaurants,
  happyHours: state.happyHours,
  day: state.day,
  drinkSpecials: state.drinkSpecials,
  foodSpecials: state.foodSpecials
});

export default connect(mapStateToProps)(RestaurantInfo);
