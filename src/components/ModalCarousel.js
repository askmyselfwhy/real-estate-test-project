import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';

class ModalCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
  }
  next() {
    const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    const nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    this.setState({ activeIndex: newIndex });
  }
  toggle = () => {
    this.setState({
      activeIndex: 0
    });
    this.props.toggleModal();
  }
  render() {
    let { items, modalOpen } = this.props;
    const { activeIndex } = this.state;
    let slides = items && items.map((item, index) =>
      <CarouselItem key={item}>
        <img src={item} alt={'house' + index} />
      </CarouselItem>
    );
    return (
      <Modal isOpen={modalOpen} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}></ModalHeader>
        <ModalBody>
          <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
            interval={false}
            slide={false}
          >
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel >
        </ModalBody>
        <ModalFooter>
          <Button primary onClick={this.toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ModalCarousel
