import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ContactBar.css';
import PropTypes from 'prop-types';

class ContactBar extends Component {
  getRestaurant = () => {
    const { restaurantId, filteredRestaurants } = this.props;
    const id = restaurantId;
    const restaurant = filteredRestaurants.find(restaurant => restaurant.id == id);

    return restaurant;
  }

  formatAddress = (address) => address.replace(/\s+/g, '+').toLowerCase().replace(',', '');

  render() {
    const restaurant = this.getRestaurant();
    const { phone, website, name } = restaurant;
    const { address } = this.props.location;
    const currentLocation = this.formatAddress(address);
    const restaurantLocation = this.formatAddress(name);

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
