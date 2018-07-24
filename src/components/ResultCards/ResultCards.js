import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultCard from '../ResultCard/ResultCard';
import PropTypes from 'prop-types';
import './ResultCards.css';
import { storeDay } from '../../actions';

export class ResultCards extends Component {
  componentDidMount() {
    this.findDay();
  }

  findDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const date = new Date();
    const dayIndex = date.getDay();
    const day = days[dayIndex];

    this.props.storeDay(day);
  }


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
          times = todaysHappyHour.combined_times;
          bestFoodSpecial = this.getBestFoodSpecial(todaysHappyHour);
          bestDrinkSpecial = this.getBestDrinkSpecial(todaysHappyHour);
          startTime = todaysHappyHour.start_time;
          endTime = todaysHappyHour.end_time;
          miles = miles.toFixed(2);
        }

        console.log(startTime)

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

export const mapDispatchToProps = (dispatch) => ({
  storeDay: (day) => {
    return dispatch(storeDay(day));
  },
});

export const mapStateToProps = (state) => ({
  filteredRestaurants: state.filteredRestaurants,
  happyHours: state.happyHours,
  foodSpecials: state.foodSpecials,
  drinkSpecials: state.drinkSpecials,
  day: state.day
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultCards);
