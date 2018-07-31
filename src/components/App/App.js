import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 
import Home from '../Home/Home';
import HappyHours from '../HappyHours/HappyHours';
import Restaurant from '../Restaurant/Restaurant';
import PropTypes from 'prop-types';
import './App.css';
import image from './images/happy-hour-home-bg.jpg';

class App extends Component {
  handleSubmit = () => {
    this.props.history.push('/HappyHourResults');
  }

  render() {
    const backgroundImage = {backgroundImage: "url(" + image + ")"};
    
    return (
      <div className="App"  style={backgroundImage}>
        <Route exact path='/' component={Home} />
        <Route exact path='/happy-hours' component={HappyHours} />
        <Route exact path='/restaurant' component={Restaurant} />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.array,
};

export default App;