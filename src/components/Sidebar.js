import React, { Component } from 'react';
import { Rating, Checkbox, Menu, List, Input, Button } from 'semantic-ui-react';
import { currencies, rooms } from '../_constants';
import _ from 'lodash';

class Sidebar extends Component {
  state = {
    isShown: true
  }
  resetForm = (e) => {
    e.preventDefault();
    document.getElementById("house-search-form").reset();
    this.props.eventHandlers.handleReset();
  }
  showForm = () => {
    let form = document.getElementById("house-search-form");
    if (this.state.isShown) {
      form.classList.add("dnone");
    } else {
      form.classList.remove("dnone");
    }
    this.setState({
      isShown: !this.state.isShown
    })
  }
  render() {
    let { handleCurrencyChange, handlePriceChange, handleRatingChange, handleRoomsChange } = this.props.eventHandlers;
    let { activeCurrencyIndex, selectedRooms } = this.props;
    return (
      <aside className="sidebar">
        <Button className="form-toggle-btn" onClick={this.showForm}>≡</Button>
        <form id="house-search-form">
          <div className="currency mb-default">
            <header>Валюта</header>
            <Menu>
              {_.map(currencies, (currency, index) =>
                <Menu.Item
                  key={currency.name}
                  index={index}
                  content={currency.name}
                  onClick={handleCurrencyChange}
                  active={activeCurrencyIndex === index}
                />
              )
              }
            </Menu>
          </div>
          <div className="rooms mb-default">
            <header>Количество комнат</header>
            <List>
              {_.map(rooms, (room, index) =>
                <List.Item key={room.label}>
                  <Checkbox
                    label={room.label}
                    value={index}
                    checked={selectedRooms && selectedRooms[index]}
                    onClick={handleRoomsChange} />
                </List.Item>
              )
              }
            </List>
          </div>
          <div className="price mb-default">
            <header>Цена</header>
            <div>
              <label>
                От <Input
                  fluid
                  type="number"
                  name="price1"
                  min={0}
                  step={10000}
                  onChange={handlePriceChange} />
              </label>
              <label>
                до <Input
                  fluid
                  type="number"
                  name="price2"
                  min={0}
                  step={10000}
                  onChange={handlePriceChange} />
              </label>
            </div>
          </div>
          <div className="rating mb-default">
            <header>Рейтинг</header>
            <Rating icon='star'
              clearable
              defaultRating={0}
              maxRating={5}
              onRate={handleRatingChange} />
          </div>
          <Button onClick={this.resetForm}>Reset</Button>
        </form>
      </aside>
    );
  }
}

export default Sidebar;
