import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import ResultCards from '../ResultCards/ResultCards';
import GoogleMap from '../GoogleMap/GoogleMap';
import SearchBar from '../SearchBar/SearchBar';
import './HappyHours.css';
import { storeRestaurants, storeFilteredRestaurants } from '../../actions';


class HappyHours extends Component {
  constructor (props) {
    super(props);
    
  }

  render() {
    return (
      <section className="happyHoursContainer">
        <Header />
        <GoogleMap />
        <SearchBar />
        <ResultCards />
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  location: state.location,
  restaurants: state.restaurants
});

export default connect(mapStateToProps)(HappyHours);
