import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RestaurantMarker.css';
import PropTypes from 'prop-types';

class RestaurantMarker extends Component {
  render() {
    const { name } = this.props;

    return (
      <section className="restaurantMarker">
        <p>{ name }</p>
      </section>
    );
  }
}

RestaurantMarker.propTypes = {
  name: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps)(RestaurantMarker);
