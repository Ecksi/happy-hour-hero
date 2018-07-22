import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';
import homeLogo from './images/home-logo.png';
import SearchBar from '../SearchBar/SearchBar';

class Home extends Component {
  constructor (props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <section className="homeContainer">
        <img src={homeLogo} className="homeLogo" alt="Happy Hour Hero Logo" />
        <h2>Find your happy hour:</h2>
          {/* <i className="fas fa-search"></i> */}
          <SearchBar />
      </section>
    );
  }
}

export default Home;
