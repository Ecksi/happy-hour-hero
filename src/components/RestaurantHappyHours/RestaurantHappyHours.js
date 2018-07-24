import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './RestaurantHappyHours.css';

class RestaurantHappyHours extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    this.getTodaysHappyHours();
  }

  getTodaysHappyHours = async () => {
    const { day, restaurantId, happyHours } = this.props;

    const todaysHappyHours = happyHours.filter(happyHour => {
      return happyHour.restaurant_id === restaurantId;
    });
  
    console.log(todaysHappyHours)
  }

  render() {
    return (
      <section className="restaurantHappyHoursContainer">
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps)(RestaurantHappyHours);
