import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultCard from '../ResultCard/ResultCard';
import PropTypes from 'prop-types';
import './ResultCards.css';

class ResultCards extends Component {
  cleanHappyHourTimes = (todaysHappyHour) => {
    const start = todaysHappyHour.start_time;
    const end = todaysHappyHour.end_time;
    const cleanStartTime = this.getFormattedTime(start);
    const cleanEndTime = this.getFormattedTime(end);
    const cleanTime = cleanStartTime + '-' + cleanEndTime;

    return cleanTime;
  }

  getFormattedTime = (military) => {
    let hours24 = parseInt(military.substring(0, 2), 10);
    let hours = ((hours24 + 11) % 12) + 1;
    let amPm = hours24 > 11 ? 'pm' : 'am';
    let minutes = military.substring(2);

    return hours + ':' + minutes + amPm;
  };

  getBestFoodSpecial = (todaysHappyHour) => {
    const { foodSpecials } = this.props;

    const bestFoodSpecial = foodSpecials.find(special => {
      return special.id === todaysHappyHour.food_specials_id && special.best_deal === true;
    });


    if (bestFoodSpecial) {
      return bestFoodSpecial.name;
    }
  }

  getBestDrinkSpecial = (todaysHappyHour) => {
    const { drinkSpecials } = this.props;

    const bestDrinkSpecial = drinkSpecials.find(special => {
      return special.id === todaysHappyHour.drink_specials_id && special.best_deal === true;
    });

    if (bestDrinkSpecial) {
      return bestDrinkSpecial.name;
    }
  }

  getTodaysHappyHour = (restaurant) => {
    const { happyHours, day } = this.props;

    const todaysHappyHour = happyHours.find(happyHour => {

      return happyHour.restaurant_id == restaurant.id && happyHour.day === day;
    });

    console.log(todaysHappyHour)

    return todaysHappyHour;
  }

  render() {
    let resultCards;
    let times;
    let startTime;
    let endTime;
    let bestFoodSpecial;
    let bestDrinkSpecial;

    const { filteredRestaurants } = this.props;

    if (filteredRestaurants.length > 0) {
      filteredRestaurants.sort(function(a, b) {
        return a.miles - b.miles;
      });

      resultCards = filteredRestaurants.map((restaurant, index) => {
        const restaurantName = restaurant.name;
        let miles = restaurant.miles;
        const { id, address, restaurant_image } = restaurant;
      
        const todaysHappyHour = this.getTodaysHappyHour(restaurant);
        
        if (todaysHappyHour) {
          times = this.cleanHappyHourTimes(todaysHappyHour);
          bestFoodSpecial = this.getBestFoodSpecial(todaysHappyHour);
          bestDrinkSpecial = this.getBestDrinkSpecial(todaysHappyHour);
          startTime = todaysHappyHour.start_time;
          endTime = todaysHappyHour.end_time;
          miles = miles.toFixed(2);
        }

        return ( <ResultCard
          restaurantName={ restaurantName }
          address={ address }
          miles={ miles }
          happyHourTimes={ times }
          foodSpecial={ bestFoodSpecial }
          drinkSpecial={ bestDrinkSpecial }
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

ResultCards.propTypes = {
  foodSpecials: PropTypes.array,
  drinkSpecials: PropTypes.array,
  happyHours:  PropTypes.array,
  filteredRestaurants: PropTypes.array,
};

export const mapStateToProps = (state) => ({
  filteredRestaurants: state.filteredRestaurants,
  happyHours: state.happyHours,
  foodSpecials: state.foodSpecials,
  drinkSpecials: state.drinkSpecials,
  day: state.day
});

export default connect(mapStateToProps)(ResultCards);
