import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Specials.css';

class Specials extends Component {
  constructor (props) {
    super(props);
  }

render() {

    return (
      <section className="specialsContainer">
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps)(Specials);
