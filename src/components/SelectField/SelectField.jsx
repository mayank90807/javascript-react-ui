// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

import { style } from './style';

class SelectField extends React.PureComponent {
  render() {
    const {
      options, defaultText, error, errorMessage, ...rest
    } = this.props;
    const dropdownOptions = options.map(
      (
        { label, value },
      ) => <option value={value} key={value}>{label}</option>,
    );
    let customStyle = style.base;
    if (error === true || errorMessage) {
      customStyle = { ...style.base, ...style.error };
    }
    console.log(customStyle);
    return (
      <>
        <select style={customStyle} {...rest}>
          <option>{defaultText}</option>
          {dropdownOptions}
        </select>
        <br />
        <span style={{ color: 'red' }}>{ errorMessage }</span>
      </>
    );
  }
}

SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'Select',
  errorMessage: '',
};

SelectField.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  defaultText: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default SelectField;
