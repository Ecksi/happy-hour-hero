import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserMarker.css';

class UserMarker extends Component {
  constructor (props) {
    super(props);
    
  }

  render() {
    return (
      <section className="userMarker">
        <i class="fas fa-female"></i>
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps)(UserMarker);
