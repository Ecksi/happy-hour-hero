import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RestaurantMarker.css';
import PropTypes from 'prop-types';
import restaurantMarker from './assets/restaurant-marker.png';

class RestaurantMarker extends Component {
  constructor (props) {
    super(props);
    
  }

  handleClick = (event) => {
    const allCards = document.querySelectorAll('.resultCardContainer');
    allCards.forEach(card => {
      card.classList.remove('selectedCard');
    });

    const id = event.target.closest('section').getAttribute('id');
    const selectedSelector = `.resultCard${id}`;
    const selectedCard = document.querySelector(selectedSelector);
    selectedCard.classList.add('selectedCard')

    selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  render() {
    const { name, id } = this.props;

    return (
      <section className={`restaurantMarker marker${id}`} id={id} onClick={(event) => this.handleClick(event)}>
        <img src={ restaurantMarker } />
      </section>
    );
  }
}

RestaurantMarker.propTypes = {
  name: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps)(RestaurantMarker);
