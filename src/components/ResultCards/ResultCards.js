import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultCard from '../ResultCard/ResultCard';
import './ResultCards.css';

class ResultCards extends Component {
  constructor (props) {
    super(props);
    
  }

  findDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const date = new Date();
    const dayIndex = date.getDay();
    const day = days[dayIndex];

    return day;
  }

  cleanHappyHourTimes = (happyHour) => {
    const todaysHappyHour = happyHour[0];
    const start = todaysHappyHour.start_time;
    const end = todaysHappyHour.end_time;
    const cleanStartTime = this.getFormattedTime(start);
    const cleanEndTime = this.getFormattedTime(end);
    const cleanTime = cleanStartTime + '-' + cleanEndTime;

    return cleanTime;
  }

  getFormattedTime = (military) => {
    var hours24 = parseInt(military.substring(0, 2), 10);
    var hours = ((hours24 + 11) % 12) + 1;
    var amPm = hours24 > 11 ? 'pm' : 'am';
    var minutes = military.substring(2);

    return hours + ':' + minutes + amPm;
  };

  render() {
    let resultCards;
    let times;
    let startTime;
    let endTime;

    const { filteredRestaurants, happyHours } = this.props;

    if (filteredRestaurants.length > 0) {
      resultCards = filteredRestaurants.map((restaurant, index) => {
        const restaurantName = restaurant.name;
        const { id, address, restaurant_image } = restaurant;
       
        const todaysHappyHour = happyHours.filter(happyHour => {
          startTime = happyHour.start_time;
          endTime = happyHour.end_time;

          const day = this.findDay();
          
          return happyHour.restaurant_id === restaurant.id && happyHour.day === day;
        });

        if (todaysHappyHour.length > 0) {
          times = this.cleanHappyHourTimes(todaysHappyHour);
        }

        

        return ( <ResultCard
          restaurantName={ restaurantName }
          address={ address }
          happyHourTimes={ times }
          startTime={ startTime }
          endTime={ endTime }
          image = { restaurant_image }
          key={ index }
          id={ id }
        />);
      });

    }

    return (
      <section className="resultCardsContainer">
        { resultCards }
      </section>
    );
  }
}

export const mapStateToProps = (state) => ({
  filteredRestaurants: state.filteredRestaurants,
  happyHours: state.happyHours
});

export default connect(mapStateToProps)(ResultCards);
