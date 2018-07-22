import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ResultCard.css';
import  moment from 'moment';
moment().format();

class ResultCard extends Component {
  constructor (props) {
    super(props);

    this.state = {
      time: {},
      seconds: null,
      currentlyHappyHour: false
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
    this.setTimeUntilRemaining();
  }

  startTimer = () => {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  setTimeUntilRemaining = () => {
    const { startTime, endTime } = this.props;
    const currentTime = moment().format('HHmm'); 

    if (startTime < currentTime < endTime) {
      this.setState({
        currentlyHappyHour: true
      }, () => this.getRemainingTime());
    } else {
      this.setState({
        currentlyHappyHour: false
      }, () => this.getRemainingTime());
    }

  }

  getRemainingTime = () => {
    const { startTime, endTime } = this.props;
    let time;
    let minutes;
    let cleanMinutes;

    this.state.currentlyHappyHour ? time = endTime : time = startTime;

    const hours = time.slice(0, 2);
    minutes = time.slice(2,4);
    
    minutes === '00' ? cleanMinutes = null : cleanMinutes = ',' + minutes;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const deadline = new Date(year, month, day, hours, cleanMinutes);
    const currentTime = Date.now();

    const seconds = (deadline - currentTime) / 1000;
    
    this.setState({
      seconds
    });
  }



  countDown = () => {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
    
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }


  render() {
    const { restaurantName, address, image, happyHourTimes, foodSpecial } = this.props;
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
        <div className="happyHourSpecials">
          { foodSpecial }
        </div>
        <div className="resultCardClock">
          <i class="far fa-clock"></i>
          <span>
            <p>{ this.state.currentlyHappyHour ? 'Ends in:' : 'Starts in:'} </p>
            <p className="resultCardStartTime">{this.state.time.h}hrs {this.state.time.m}mins {this.state.time.s}secs</p>
          </span>
        </div>
      </article>
    );
  }
}

export const mapStateToProps = (state) => ({
  filteredRestaurants: state.filteredRestaurants
});

export default connect(mapStateToProps)(ResultCard);
