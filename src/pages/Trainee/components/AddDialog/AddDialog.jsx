/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import Person from '@material-ui/icons/Person';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import * as yup from 'yup';
import { withStyles } from '@material-ui/styles';

const validationSchema = yup.object().shape({
  name: yup.string('Name Should be a string').required('Name is Required').min(3, 'Minimum length should be 3'),
  email: yup
    .string('Email should be a string')
    .required('Email is required')
    .email('Should be a valid Email'),
  password: yup
    .string('password should be string')
    .required('password is required')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Should Contain minimum 8 character which inludes: atlease 1 lowercase, 1 Uppercase, 1 Special Character, 1 Numeric',
    ),
  confirmPassword: yup.string().required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const styles = theme => ({
  buttonBody: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '55%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});
class AddDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      touch: {},
      error: {},
      button: true,
      loading: false,
    };
  }

  validateSchema = () => {
    const errorObj = {};
    const
      {
        name,
        email,
        password,
        confirmPassword,
      } = this.state;
    validationSchema
      .validate({
        name,
        email,
        password,
        confirmPassword,
      }, { abortEarly: false })
      .then(() => {
        this.setState({
          button: false,
          error: {},
        });
      })
      .catch((error) => {
        error.inner.forEach((element) => {
          errorObj[element.path] = element.message;
        });
        this.setState({
          error: errorObj,
          button: true,
        });
      });
  };

  handleFieldChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      }, this.validateSchema,
    );
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword,
    });
  };

  handleTouch = elementName => () => {
    const { touch } = this.state;
    touch[elementName] = true;
    this.setState(
      {
        touch,
      },
      () => {
        this.validateSchema(this.state);
      },
    );
  };


  onSubmitButton = () => {
    const { onSubmit } = this.props;
    const { name, email, password } = this.state;
    onSubmit({ name, email, password });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {
      open, onClose, classes, loading,
    } = this.props;
    const { state } = this;
    const {
      showPassword,
      name,
      email,
      password,
      confirmPassword,
      button,
    } = state;
    return (
      <>
        <Dialog open={open} maxWidth="md" fullWidth>
          <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter Your Trainee Details</DialogContentText>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  id="input-with-icon-adornment"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                  value={name}
                  label="Name"
                  name="name"
                  className="name"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleFieldChange}
                  onBlur={this.handleTouch('name')}
                  error={state.touch.name && state.error.hasOwnProperty('name')}
                />
                <FormHelperText error id="component-error-text">
                  {state.touch.name && state.error.name}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="input-with-icon-adornment"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                  label="Email"
                  value={email}
                  className="email"
                  name="email"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleFieldChange}
                  onBlur={this.handleTouch('email')}
                  error={
                    state.touch.email && state.error.hasOwnProperty('email')
                  }
                />
                <FormHelperText error id="component-error-text">
                  {state.touch.email && state.error.email}
                </FormHelperText>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="input-with-icon-adornment"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          tabIndex={-1}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  value={password}
                  name="password"
                  className="password"
                  margin="normal"
                  onChange={this.handleFieldChange}
                  variant="outlined"
                  onBlur={this.handleTouch('password')}
                  error={
                    state.touch.password && state.error.hasOwnProperty('password')
                  }
                />
                <FormHelperText error id="component-error-text">
                  {state.touch.password && state.error.password}
                </FormHelperText>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="input-with-icon-adornment"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          tabIndex={-1}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  type={showPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  name="confirmPassword"
                  className="confirmPassword"
                  value={confirmPassword}
                  margin="normal"
                  variant="outlined"
                  onBlur={this.handleTouch('confirmPassword')}
                  onChange={this.handleFieldChange}
                  error={
                    state.touch.confirmPassword && state.error.hasOwnProperty('confirmPassword')
                  }
                />
                <FormHelperText error id="component-error-text">
                  {state.touch.confirmPassword && state.error.confirmPassword}
                </FormHelperText>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose('openRegisterDialog')} color="primary">
              Cancel
            </Button>
            <div className={classes.buttonBody}>
              <div className={classes.wrapper}>
                <Button onClick={this.onSubmitButton} disabled={button || loading} color="primary">
                  Submit
                </Button>
                {loading && (
                  <CircularProgress size={24} className={classes.buttonProgress} />
                )}
              </div>
            </div>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
AddDialog.defaultProps = {};

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddDialog);
