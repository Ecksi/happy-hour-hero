import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RestaurantMarker.css';
import PropTypes from 'prop-types';
import restaurantMarker from './assets/restaurant-marker.png';

export class RestaurantMarker extends Component {
  handleClick = (event) => {
    const allCards = document.querySelectorAll('.resultCardContainer');
    const id = event.target.closest('section').getAttribute('id');
    const selectedSelector = `.resultCard${id}`;
    const selectedCard = document.querySelector(selectedSelector);

    allCards.forEach(card => card.classList.remove('selectedCard'));
    selectedCard.classList.add('selectedCard');
    selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  render() {
    const { id } = this.props;

    return (
      <section className={`restaurantMarker marker${id}`} id={id} onClick={(event) => this.handleClick(event)}>
        <img src={ restaurantMarker } alt='Restaurant Marker' />
      </section>
    );
  }
}

RestaurantMarker.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps)(RestaurantMarker);
