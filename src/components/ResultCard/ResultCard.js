import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ResultCard.css';

class ResultCard extends Component {
  constructor (props) {
    super(props);

  }


  render() {
    const { restaurantName, address, image, happyHourTimes } = this.props;
    const backgroundImage = {backgroundImage: "url(" + image + ")"};

    return (
      <article className="resultCardContainer">
        <div className="resultCardImage" style={backgroundImage}>
        </div>
        <div className="resultCardInfo">
          <h2>{ restaurantName }</h2>
          <p className="address">{ address }</p>
          <h3>happy hour times</h3>
          <p className="times">mon-fri <span>{ happyHourTimes }</span></p>
        </div>
        <div className="resultCardClock">
          <i class="far fa-clock"></i>
          <p>Starts in:</p>
          <p className="resultCardStartTime"></p>
        </div>
      </article>
    );
  }
}

export const mapStateToProps = (state) => ({
  filteredRestaurants: state.filteredRestaurants
});

export default connect(mapStateToProps)(ResultCard);
