import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserMarker.css';
import userMarker from './assets/user-marker.png';

export class UserMarker extends Component {
  render() {
    return (
      <section className="userMarker">
        <img src={ userMarker } alt="User Pin"/>
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps)(UserMarker);
