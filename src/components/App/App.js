import React, { Component } from 'react';
import './App.css';
import homeLogo from './images/home-logo.png';

class App extends Component {
  constructor (props) {
    super(props);

  }

  handleSubmit = () => {

  }

  render() {
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default App;
