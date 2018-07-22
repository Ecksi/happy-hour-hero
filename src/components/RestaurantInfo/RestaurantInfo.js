import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './RestaurantInfo.css';
import borderImg from './assets/main-img-border.png';

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

  render() {
    const restaurant = this.getRestaurant();
    const { name, address, restaurant_image, happyHourTimes, foodSpecial, drinkSpecial, miles, id } = restaurant;
    const backgroundImage = {backgroundImage: "url(" + restaurant_image + ")"};
    const borderBackground = {backgroundImage: "url(" + borderImg + ")"};

    return (
      <section className="restaurantInfoContainer" style={ backgroundImage }>
        <div className="restaurantImageBorder" style={ borderBackground }></div>
        <section className="restaurantInfo">
          <h1>{ name }</h1>
          <p className="restaurantAddress">{ address }</p>
          <h3>happy hour times</h3>
          <p className="times">mon-fri <span>{ happyHourTimes }</span></p>
        </section>
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  restaurantId: state.restaurantId,
  filteredRestaurants: state.filteredRestaurants
});

export default connect(mapStateToProps)(Restaurant);
