/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React from 'react';
import * as yup from 'yup';
import { truncateSync } from 'fs';
import {
  TextField, Slider, SelectField, RadioGroup, Button,
} from '../../components/index';
import * as constants from '../../configs/constant';

const validationSchema = yup.object().shape({
  sport: yup
    .string('Sport Field should be string')
    .required('Sport field is required'),
  name: yup
    .string('Name should be string')
    .required('name Is required')
    .min(3),
  role: yup
    .string('role should be string')
    .required('role is required'),
});
class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', sport: '', role: '', error: {}, touch: {}, button: true,
    };
  }

  hasErrors = (obj) => {

  }

  handleTouch = elementName => () => {
    const { touch } = this.state;
    touch[elementName] = true;
    this.setState({
      touch,
    }, () => {
      this.validateSchema(this.state);
    });
  }

  getError = (elementName) => {
  }

  validateSchema = (obj) => {
    // const obj = { role: '', name: '', sport: 13 };
    const errorObj = {};
    validationSchema.validate(obj, { abortEarly: false }).then((result) => {
      // console.log(result);
      this.setState({
        button: false,
        error: {},
      });
    })
      .catch((error) => {
        error.inner.forEach((element) => {
          errorObj[element.path] = element.message;
        });
        console.log('Errors-->', errorObj);
        this.setState({
          error: errorObj,
          button: true,
        });
      });
    // return errorObj;
  }

  handleTextChange = (event) => {
    this.setState({
      name: event.target.value,
    }, () => {
      this.validateSchema(this.state);
    });
  }

  handleSelectChange = (event) => {
    const { state } = this;
    this.setState({
      sport: event.target.value,
      role: '',
    }, () => {
      this.validateSchema(this.state);
    });
  }

  handleRadio = value => (event) => {
    const { state } = this;
    this.setState({
      role: value,
    }, () => {
      this.validateSchema(this.state);
    });
  }

  // eslint-disable-next-line consistent-return
  renderRadio() {
    const { state } = this;
    if (state.sport === constants.SPORT_FOOTBALL) {
      return (
        <>
          <h4>What you do?</h4>
          <RadioGroup
            value={state.role}
            onChange={this.handleRadio}
            options={constants.FOOTBALL_ARRAY}
          />
        </>
      );
    }
    if (state.sport === constants.SPORT_CRICKET) {
      return (
        <>
          <h4>What you do?</h4>
          <RadioGroup
            value={state.role}
            onChange={this.handleRadio}
            options={constants.CRICKET_ARRAY}
          />
        </>
      );
    }
  }

  render = () => {
    const { state } = this;
    console.log(state);
    return (
      <div style={{ margin: '30px' }}>
        <h4>Name</h4>
        <TextField
          onChange={this.handleTextChange}
          value={state.name}
          onBlur={this.handleTouch('name')}
          errorMessage={state.touch.name && state.error.name}
          // eslint-disable-next-line no-prototype-builtins
          error={state.touch.name && state.error.hasOwnProperty('name')}

        />
        <h4>Select the game you play?</h4>
        <SelectField
          onChange={this.handleSelectChange}
          value={state.sport}
          options={constants.SELECT_ARRAY}
          onBlur={this.handleTouch('sport')}
          errorMessage={state.touch.sport && state.error.sport}
        />
        { this.renderRadio() }
        <br />
        <br />
        <Button value="Cancel" />
        <Button color="primary" inValid={state.button} />


      </div>
    );
  }
}
export default InputDemo;
