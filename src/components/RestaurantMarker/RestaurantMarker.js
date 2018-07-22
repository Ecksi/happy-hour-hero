import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RestaurantMarker.css';

class RestaurantMarker extends Component {
  constructor (props) {
    super(props);
    
  }

  render() {
    const { name } = this.props;

    return (
      <section className="restaurantMarker">
        <p>{ name }</p>
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps)(RestaurantMarker);
