import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ResultCard.css';

class ResultCard extends Component {
  constructor (props) {
    super(props);

    this.state = {
      time: {},
      seconds: 8073.797,
      timeUntil: false,
      timeRemaining: false
    }
,
    this.timer = 0;
    this.startTimer = this.startTimer();
    this.countDown = this.countDown();
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer;
    this.getTimeRemaining();
  }

  startTimer = () => {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  getTimeRemaining = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate()
    const deadline = new Date(year, month, day, 21, 30)
    const currentTime = Date.now();

    const seconds = (deadline - currentTime) / 1000;
    
    this.setState({
      seconds
    })
  }

  countDown = () => {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }


  render() {
    const { restaurantName, address, image, happyHourTimes, timer } = this.props;
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
          <p>Starts in:</p><br />
          <p className="resultCardStartTime">h: {this.state.time.h} m: {this.state.time.m} s: {this.state.time.s}</p>
        </div>
      </article>
    );
  }
}

export const mapStateToProps = (state) => ({
  filteredRestaurants: state.filteredRestaurants
});

export default connect(mapStateToProps)(ResultCard);
