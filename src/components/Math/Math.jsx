/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

class Math extends React.PureComponent {
  calculate(first, second, operator) {
    switch (operator) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return (second === 0 ? 'Infinity' : first / second);
      default:
        return 'Invalid Operation requested';
    }
  }

  render() {
    const {
      first, second, operator, children,
    } = this.props;
    const result = this.calculate(first, second, operator);
    return (
      <>
        { children({
          first, second, operator, result,
        }) }
      </>
    );
  }
}
Math.defaultProps = {

};

Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default Math;
