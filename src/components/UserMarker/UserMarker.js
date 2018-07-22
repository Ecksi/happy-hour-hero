import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserMarker.css';
import userMarker from './assets/user-marker.png';


class UserMarker extends Component {
  render() {
    return (
      <section className="userMarker">
        <img src={ userMarker } />
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps)(UserMarker);
