import React, { Component } from 'react';
import './Home.css';
import homeLogo from './images/home-logo.png';

class Home extends Component {
  constructor (props) {
    super(props);

  }

  handleSubmit = () => {
    this.props.history.push('/HappyHours');
  }

  render() {
    return (
      <section className="homeContainer">
        <img src={homeLogo} className="homeLogo" alt="Happy Hour Hero Logo" />
        <h2>Find your happy hour:</h2>
        <form className="homeSearchForm" onSubmit={this.handleSubmit}>
          <i class="fas fa-map-marker-alt"></i>
          <i class="fas fa-search"></i>
          <input 
            className="homeSearchInput" 
            placeholder="Enter a restaurant or location" 
          />
          <input className="homeSearchSubmit" type="submit" value="Submit" />
        </form>
      </section>
    );
  }
}

export default Home;
