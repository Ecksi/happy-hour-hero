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

  cleanHappyHourTimes = (todaysHappyHour) => {
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
      return bestDrinkSpecial.name
    }
  }

  getTodaysHappyHour = (restaurant) => {
    const { happyHours } = this.props;
    const todaysHappyHour = happyHours.find(happyHour => {
      const day = this.findDay();

      return happyHour.restaurant_id === restaurant.id && happyHour.day === day;
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

    const { filteredRestaurants, happyHours } = this.props;

    if (filteredRestaurants.length > 0) {
      resultCards = filteredRestaurants.map((restaurant, index) => {
        const restaurantName = restaurant.name;
        const { id, address, restaurant_image } = restaurant;
        
        const todaysHappyHour = this.getTodaysHappyHour(restaurant);
        
        if (todaysHappyHour) {
          times = this.cleanHappyHourTimes(todaysHappyHour);
          bestFoodSpecial = this.getBestFoodSpecial(todaysHappyHour);
          bestDrinkSpecial = this.getBestDrinkSpecial(todaysHappyHour);
          startTime = todaysHappyHour.start_time;
          endTime = todaysHappyHour.end_time;
        }

        return ( <ResultCard
          restaurantName={ restaurantName }
          address={ address }
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

export const mapStateToProps = (state) => ({
  filteredRestaurants: state.filteredRestaurants,
  happyHours: state.happyHours,
  foodSpecials: state.foodSpecials,
  drinkSpecials: state.drinkSpecials
});

export default connect(mapStateToProps)(ResultCards);
