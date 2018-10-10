import React, { Component } from 'react';
import { Item, Rating, Image, Button, Menu, Loader, Icon } from 'semantic-ui-react';
import ModalCarousel from './ModalCarousel';
import moment from 'moment';
import 'moment/locale/uk';
import { sortBy } from '../_helpers'
import { sorts } from '../_constants';
import _ from 'lodash';

moment.locale(navigator.language)

class Main extends Component {
  state = {
    sortField: '',
    sortOrder: '',
    modalOpen: false,
    activeId: 0
  }
  onImgClick = (e) => {
    this.setState({
      activeId: e.target.dataset['id'],
    })
    this.toggleModal();
  }
  toggleModal = (e) => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }
  handleSort = (e, { name }) => {
    let fieldName = name;
    if (this.state.sortField === fieldName) {
      this.setState({
        sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc'
      })
    } else {
      this.setState({
        sortField: fieldName,
        sortOrder: 'asc'
      })
    }
  }

  render() {
    let { houses } = this.props;
    let { sortField, sortOrder, activeId } = this.state;
    let images;
    if (houses) {
      let house = _.find(houses, house => house.id === Number.parseInt(activeId));
      images = house ? house.images : [];
      if (sortField) {
        houses = sortBy(sortField)(houses, sortOrder);
      }
    }
    return (
      <div className="main">
        <ModalCarousel
          toggleModal={this.toggleModal}
          modalOpen={this.state.modalOpen}
          items={images} />
        {houses ?
          houses.length > 0 ?
            <React.Fragment>
              <header>
                <Menu>
                  {_.map(sorts, item =>
                    <Menu.Item
                      key={item.name}
                      name={item.name}
                      onClick={this.handleSort}
                    ><Icon name="sort" />{item.label}</Menu.Item>
                  )
                  }
                </Menu>
              </header>
              <Item.Group className="houses">
                {_.map(houses, (house, index) =>
                  <Item
                    className="house"
                    key={house.id}
                    inverted="true">
                    <div className="additional-info" >
                      <div className="image-container">
                        <Image size='medium' src={house.images[0]} onClick={this.onImgClick} data-id={house.id} />
                      </div>
                      <Rating icon='star'
                        defaultRating={house.rating}
                        disabled
                        maxRating={5} />
                    </div>
                    <Item.Content className="info">
                      <Item.Description>
                        <p>Адресс: {house.full_address}</p>
                        <p>Описание: {house.description}</p>
                      </Item.Description>
                      <Item.Extra>
                        <p>
                          <Icon name="home" />{house.total_rooms > 1 ? house.total_rooms + ' комнаты' : house.total_rooms + ' комната'}
                        </p>
                        <p>
                          <Icon name="calendar alternate outline" />{moment(house.public_date).format("D MMM YYYY, ddd")}
                        </p>
                        <Button color="blue">Купить за {(house.price * this.props.rate).toFixed(2)}{this.props.currency_icon}</Button>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                )
                }
              </Item.Group>
            </React.Fragment>
            :
            <div>Нет домов удовлетворяющих вашим фильтрам</div>
          :
          <Loader content='Loading' active inline='centered' />
        }
      </div>
    );
  }
}

export default Main;
