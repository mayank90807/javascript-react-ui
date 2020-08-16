/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

class Button extends React.PureComponent {
  render() {
    const {
      value, color, inValid, ...rest
    } = this.props;
    console.log('Button', this.props);
    let customStyle = style.base;
    if (color === 'primary') {
      customStyle = { ...style.base, ...style.primary };
    }
    if (inValid) {
      customStyle = { ...style.base, ...style.inValid };
      rest.disabled = true;
    }
    return (
      <button type="button" {...rest} style={customStyle}>
        {value}
      </button>
    );
  }
}
Button.defaultProps = {
  color: 'primary',
  disabled: false,
  style: {},
  value: 'Submit',
  inValid: false,
};

Button.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  inValid: PropTypes.bool,
};

export default Button;
