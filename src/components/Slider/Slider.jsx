/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE } from '../../configs/constant';
import { getRandomNumber, getNextRoundRobin } from '../../lib/utils/math';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    const { defaultBanner } = props;
    this.state = { imageUrl: defaultBanner, updatedPosition: 0 };
  }

  componentDidMount() {
    const { duration } = this.props;
    console.log('componentDidMount --> Clock');
    this.timerID = setInterval(
      () => this.imageChanger(),
      duration,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  imageChanger() {
    const { random, banners } = this.props;
    console.log(banners);
    const { state } = this;
    let { updatedPosition } = state;
    if (random) {
      updatedPosition = getRandomNumber(banners.length);
    } else {
      updatedPosition = getNextRoundRobin(state.updatedPosition, banners.length);
    }

    this.setState({
      imageUrl: banners[updatedPosition],
      updatedPosition,
    });
  }

  render() {
    const { props, state } = this;
    const { altText, height } = props;
    console.log('Rendering-->', this.state);

    return (
      <div style={{ height: `${height}px` }} align="center"><img src={PUBLIC_IMAGE_FOLDER + state.imageUrl} alt={altText} style={{ maxHeight: '100%', maxWidth: '100%' }} /></div>
    );
  }
}


// propTypes validation

Slider.defaultProps = {
  altText: 'Default Banner',
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
};

Slider.propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.array.isRequired,
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

export default Slider;
