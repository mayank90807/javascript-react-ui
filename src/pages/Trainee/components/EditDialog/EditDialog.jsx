/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/no-unused-state */
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
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import * as yup from 'yup';
import { withStyles } from '@material-ui/styles';

const validationSchema = yup.object().shape({
  name: yup.string('Name Should be a string').required('Name is Required'),
  email: yup
    .string('Email should be a string')
    .required('Email is required')
    .email('Should be a valid Email'),
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
class EditDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    const { userData } = props;
    this.state = {
      showPassword: false,
      name: userData && userData.name,
      email: userData && userData.email,
      touch: {},
      error: {},
      button: !userData,
    };
  }

  validateSchema = (obj) => {
    // const obj = { role: '', name: '', sport: 13 };
    const errorObj = {};
    validationSchema
      .validate(obj, { abortEarly: false })
      // eslint-disable-next-line no-unused-vars
      .then((result) => {
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

  handleNameChange = (event) => {
    this.setState(
      {
        name: event.target.value,
      },
      () => {
        this.validateSchema(this.state);
      },
    );
  };

  handleEmailChange = (event) => {
    this.setState(
      {
        email: event.target.value,
      },
      () => {
        this.validateSchema(this.state);
      },
    );
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
    const { name, email } = this.state;
    onSubmit({ name, email });
  }

  render() {
    const {
      open,
      onClose,
      loading,
      classes,
    } = this.props;
    const { state } = this;
    const {
      name,
      email,
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
                  className="name"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleNameChange}
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
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleEmailChange}
                  onBlur={this.handleTouch('email')}
                  error={
                    state.touch.email && state.error.hasOwnProperty('email')
                  }
                />
                <FormHelperText error id="component-error-text">
                  {state.touch.email && state.error.email}
                </FormHelperText>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <div className={classes.buttonBody}>
              <div className={classes.wrapper}>
                <Button onClick={this.onSubmitButton} disabled={button} color="primary">
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
EditDialog.defaultProps = {

};

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  userData: PropTypes.object,
};

export default withStyles(styles)(EditDialog);
