import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RestaurantMarker.css';

class UserMarker extends Component {
  constructor (props) {
    super(props);
    
  }

  render() {
    return (
      <section className="restaurantMarker">
        <p>Restaurant</p>
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps)(UserMarker);
