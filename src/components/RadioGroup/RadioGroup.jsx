/* eslint-disable react/no-unused-prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
// import {style} from "./style"
class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { val: '' };
  }


  render() {
    const { props } = this;
    const { options, onChange, value } = props;
    const radioOptions = options.map(({ label, value: val }) => (
      <React.Fragment key={val}>
        <input type="radio" value={val} onChange={onChange(val)} checked={value === val} />
        {label}
        <br />
      </React.Fragment>
    ));
    return radioOptions;
  }
}


RadioGroup.defaultProps = {
  error: '',
  options: [],
};

RadioGroup.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
};
export default RadioGroup;
