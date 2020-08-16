/* eslint-disable react/prop-types */
import React from 'react';
import Navbar from '../components/Navbar';

class PrivateLayout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <>
        <Navbar />
        { children }
      </>
    );
  }
}

export default PrivateLayout;
