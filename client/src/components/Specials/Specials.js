import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specials.css';

export class Specials extends Component {
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
