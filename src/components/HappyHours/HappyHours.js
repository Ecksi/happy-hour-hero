import React, { Component } from 'react';
import Header from '../Header/Header';
import GoogleMap from '../GoogleMap/GoogleMap';
import './HappyHours.css';

class HappyHours extends Component {
  constructor (props) {
    super(props);
    
  }

  render() {
    return (
      <section className="happyHoursContainer">
        <Header />
        <GoogleMap />
      </section>
    );
  }
}

export default HappyHours;
