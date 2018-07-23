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

  render() {
    const restaurant = this.getRestaurant();
    const happyHours = this.getTodaysHappyHours(restaurant);
    console.log(happyHours)
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
          <p className="times">mon-fri <span>{  }</span></p>
        </section>
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  restaurantId: state.restaurantId,
  filteredRestaurants: state.filteredRestaurants,
  happyHours: state.happyHours,
  day: state.day
});

export default connect(mapStateToProps)(Restaurant);
