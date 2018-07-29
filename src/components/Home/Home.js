import React, { Component } from 'react';
import { connect } from 'react-redux';
import homeLogo from './images/home-logo.png';
import SearchBar from '../SearchBar/SearchBar';
import { storeDay } from '../../actions';
import PropTypes from 'prop-types';
import './Home.css';

export class Home extends Component {
  componentDidMount() {
    this.findDay();
  }

  findDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const date = new Date();
    const dayIndex = date.getDay();
    const day = days[dayIndex];

    this.props.storeDay(day);
  }

  render() {
    return (
      <section className="homeContainer">
        <img src={homeLogo} className="homeLogo" alt="Happy Hour Hero Logo" />
        <h2>Find your happy hour:</h2>
        <SearchBar />
      </section>
    );
  }
}

Home.propTypes = {
  storeDay: PropTypes.func,
};

export const mapDispatchToProps = (dispatch) => ({
  storeDay: (day) => {
    return dispatch(storeDay(day));
  },
});

export default connect(null, mapDispatchToProps)(Home);
