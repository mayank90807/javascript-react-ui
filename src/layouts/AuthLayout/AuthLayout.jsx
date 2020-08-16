/* eslint-disable react/prop-types */
import React from 'react';
import Footer from '../components/Footer';

class AuthLayout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <>
        { children }
        <Footer />
      </>
    );
  }
}

export default AuthLayout;
