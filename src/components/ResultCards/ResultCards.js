import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultCard from '../ResultCard/ResultCard';
import './ResultCards.css';

class ResultCards extends Component {
  constructor (props) {
    super(props);
    
  }

  render() {
    let resultCards;
    const { filteredRestaurants } = this.props;

    if (filteredRestaurants.length > 0) {
      resultCards = filteredRestaurants.map((restaurant, index) => {
        const restaurantName = restaurant.name;
        const { id, address, restaurant_image } = restaurant;

        return ( <ResultCard
          restaurantName={ restaurantName }
          address={ address }
          image = { restaurant_image }
          key={ index }
          id={ id }
        />);
      });

    }

    return (
      <section className="resultCardsContainer">
        { resultCards }
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  filteredRestaurants: state.filteredRestaurants
});

export default connect(mapStateToProps)(ResultCards);
