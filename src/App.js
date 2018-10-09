import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import { Container } from 'semantic-ui-react';
import { currencies, rooms } from './_constants';
import axios from 'axios';
var Promise = require('es6-promise').Promise;
// import es6- from 'es6-promise'

class App extends Component {
  state = {
    houses: null,
    rates: null,
    activeCurrencyIndex: 0,
    rate: 1,
    currency_icon: currencies[0].symb,
    rating: 0,
    price1: Number.NEGATIVE_INFINITY,
    price2: Number.POSITIVE_INFINITY,
    selectedRooms: Array.apply(null, Array(rooms.length))
      .map(() => false)
  }
  componentWillMount() {
    Promise.resolve(axios.get('https://demo4452328.mockable.io/property'))
      .then(response => this.setState({ houses: response.data.data }))
    // Getting current rates
    Promise.resolve(axios.get('https://free.currencyconverterapi.com/api/v6/convert?q=UAH_USD,UAH_EUR&compact=y'))
      .then(response => {
        let rates = {
          "UAH_UAH": {
            val: 1
          },
          ...response.data
        }
        this.setState({ rates });
      })
  }
  handleCurrencyChange = (e, { index }) => {
    let key = 'UAH_' + currencies[index].name.toUpperCase();
    this.setState({
      activeCurrencyIndex: index,
      rate: this.state.rates[key].val,
      currency_icon: currencies[index].symb
    })
  }
  handleRoomsChange = (e, { value }) => {
    let newRooms = [...this.state.selectedRooms];
    newRooms[value] = !newRooms[value];
    this.setState({ selectedRooms: newRooms })
  }
  handleRatingChange = (e, { rating }) => {
    this.setState({
      rating
    })
  }
  handlePriceChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    })
  }
  handleReset = () => {
    this.setState({
      rating: 0,
      price1: Number.NEGATIVE_INFINITY,
      price2: Number.POSITIVE_INFINITY,
      selectedRooms: Array.apply(null, Array(rooms.length))
        .map(() => false)
    })
  }
  // Filtration methods
  filterByRating = (houses) => {
    let { rating } = this.state;
    if (rating > 0) {
      return houses.filter(house => house.rating === rating)
    }
    return houses;
  }
  filterByPrice = (houses) => {
    let { price1, price2, rate } = this.state;
    return houses.filter(house => house.price * rate >= price1 && house.price * rate <= price2)
  }
  filterByRooms = (houses) => {
    let { selectedRooms } = this.state;
    if (selectedRooms[0]) return houses;
    let newHouses = [];
    for (let i = 1; i < selectedRooms.length; i++) {
      if (selectedRooms[i]) {
        let numberOfRooms = rooms[i].total_rooms;
        newHouses = newHouses.concat([...houses]
          .filter(item => item.total_rooms === numberOfRooms));
      }
    }
    return newHouses;
  }
  render() {
    let { houses } = this.state;
    let filteredHouses;
    if (houses) {
      filteredHouses = this.filterByRating(houses)
      filteredHouses = this.filterByPrice(filteredHouses);
      filteredHouses = this.filterByRooms(filteredHouses);
    }
    return (
      <Container>
        <main className="main-layout">
          <Sidebar
            eventHandlers={
              {
                handleCurrencyChange: this.handleCurrencyChange,
                handleRatingChange: this.handleRatingChange,
                handlePriceChange: this.handlePriceChange,
                handleRoomsChange: this.handleRoomsChange,
                handleReset: this.handleReset
              }
            }
            activeCurrencyIndex={this.state.activeCurrencyIndex}
            selectedRooms={this.state.selectedRooms}
          >
          </Sidebar>
          <Main
            houses={filteredHouses}
            rate={this.state.rate}
            currency_icon={this.state.currency_icon}
          ></Main>
        </main>
      </Container>
    );
  }
}

export default App;


