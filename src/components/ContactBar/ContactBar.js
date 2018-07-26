import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ContactBar.css';
import PropTypes from 'prop-types';

class ContactBar extends Component {
  render() {
    const restaurant = this.props.restaurant
    const { phone, website, name } = restaurant;
    const { currentLocation, restaurantLocation } = this.props;

    return (
      <section className="contactBarContainer">
        <a href={`tel:${phone}`} className="contactPhone">Phone <i className="fas fa-phone"></i></a>
        <a href={website} target="_blank" className="contactWebsite">Website <i className="fas fa-globe-americas"></i></a>
        <a href={`https://www.google.com/maps/dir/${currentLocation}/${restaurantLocation}`} target="_blank" className="contactDirections">Directions <i className="fas fa-compass"></i></a>
        <a href="#" className="contactShare">Share <i className="fas fa-share-alt"></i></a>
      </section>
    );
  }
}

ContactBar.propTypes = {
  location: PropTypes.string,
  filteredRestaurants: PropTypes.array,
  restaurantId: PropTypes.number,
};

export const mapStateToProps = (state) => ({
  location: state.location,
  restaurantId: state.restaurantId,
  filteredRestaurants: state.filteredRestaurants
});

export default connect(mapStateToProps)(ContactBar);
