import React, { Component } from 'react';
import Header from '../Header/Header';
import './HappyHours.css';

class HappyHours extends Component {
  constructor (props) {
    super(props);
    
  }

  render() {
    return (
      <section className="happyHoursContainer">
        <Header />
      </section>
    );
  }
}

export default HappyHours;
