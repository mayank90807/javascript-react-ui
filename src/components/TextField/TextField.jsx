// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { style } from './style';

class TextField extends React.PureComponent {
  render() {
    const { error, errorMessage, ...rest } = this.props;
    let customStyle = style.base;
    if (error === true || errorMessage) {
      customStyle = { ...style.base, ...style.error };
    }
    return (
      <>
        <input type="text" {...rest} style={customStyle} />
        <br />
        <span style={{ color: 'red' }}>{errorMessage}</span>
      </>
    );
  }
}
TextField.defaultProps = {
  error: false,
  errorMessage: '',
};

TextField.propTypes = {
  error: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default TextField;
