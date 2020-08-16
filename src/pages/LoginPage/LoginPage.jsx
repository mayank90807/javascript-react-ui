/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React from 'react';
import * as yup from 'yup';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Paper, FormHelperText } from '@material-ui/core';
import Email from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import { Query, Mutation, withApollo } from 'react-apollo';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import { LocalStorageOps, withSnackBarConsumer } from '../../hoc';
import { postApiRequest } from '../../lib/utils/api';


const validationSchema = yup.object().shape({
  email: yup
    .string('Email should be string')
    .required('Email is required')
    .email('Email should be valid'),
  password: yup
    .string('Password should be string')
    .required('Password is required'),
});

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    padding: theme.spacing(3, 3),
    marginTop: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonBody: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '55%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      email: '',
      password: '',
      error: {},
      touch: {},
      button: true,
      loading: false,
      authRedirect: false,
      login: false,
    };
  }

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

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword,
    });
  };

  validateSchema = () => {
    // const obj = { role: '', name: '', sport: 13 };
    const errorObj = {};
    validationSchema
      .validate(this.state, { abortEarly: false })
      .then((result) => {
        // console.log(result);
        this.setState({
          button: false,
          error: {},
          loading: false,
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
    // return errorObj;
  };

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, this.validateSchema);
  }


  onSubmitButton = async () => {
    const {
      loading, email, password, authRedirect,
    } = this.state;
    const { setItem, handleOpen, client } = this.props;
    if (!loading) {
      this.setState({
        loading: true,
        button: true,
      });
    }
    const LOGIN_DATA = gql`
    query getLogin($email: String, $password: String){
      getLogin(email: $email, password: $password){
        message
        data
      }
    }
    `;
    try {
      const { data } = await client.query({
        query: LOGIN_DATA,
        variables: { email, password },
      });
      if (data.getLogin.data !== null) {
        setItem('token', data.getLogin.data);
        this.setState({
          button: false,
          loading: false,
          authRedirect: true,
        });
      } else {
        this.setState({
          button: false,
          loading: false,
        });
        handleOpen(data.getLogin.message, 'error');
      }
    } catch (err) {
      this.setState({
        button: false,
        loading: false,
      });
      handleOpen('Server Error. Please try after sometime!', 'error');
    }
  }


  render = () => {
    const { state, props } = this;
    const { classes } = props;
    const {
      showPassword, button, email, password, loading, authRedirect, login,
    } = state;
    if (authRedirect) {
      return (<Redirect to="/trainee" />);
    }
    return (
      <React.Fragment>
        <Container component="main" maxWidth="xs">
          <Paper className={classes.root}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">Log in</Typography>
            <form className={classes.form}>
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
                label="Email Address"
                value={email}
                name="email"
                className="email"
                margin="normal"
                variant="outlined"
                onChange={this.handleFieldChange}
                onBlur={this.handleTouch('email')}
                error={state.touch.email && state.error.hasOwnProperty('email')}
              />
              <FormHelperText error id="component-error-text">
                {state.touch.email && state.error.email}
              </FormHelperText>
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
                className="password"
                name="password"
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
              <div className={classes.buttonBody}>
                <div className={classes.wrapper}>
                  <Button
                    onClick={this.onSubmitButton}
                    disabled={button}
                    className={classes.submit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                  {loading && (
                    <CircularProgress size={24} className={classes.buttonProgress} />
                  )}
                </div>
              </div>
            </form>
          </Paper>
        </Container>
      </React.Fragment>
    );
  };
}
export default withApollo(withSnackBarConsumer(LocalStorageOps(withStyles(styles)(LoginPage))));
