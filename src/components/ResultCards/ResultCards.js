import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import ResultCard from '../ResultCard/ResultCard';
import GoogleMap from '../GoogleMap/GoogleMap';
import './ResultCards.css';
import { storeRestaurants, storeFilteredRestaurants } from '../../actions';


class ResultCards extends Component {
  constructor (props) {
    super(props);
    
  }

  render() {
    return (
      <section className="resultCardsContainer">
        <ResultCard />
      </section>
    );
  }
}

export default ResultCards;
