import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 
import Home from '../Home/Home';
import HappyHours from '../HappyHours/HappyHours';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  handleSubmit = () => {
    this.props.history.push('/HappyHourResults');
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Home} />
        <Route exact path='/happyHours' component={HappyHours} />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.array,
};

export default App;