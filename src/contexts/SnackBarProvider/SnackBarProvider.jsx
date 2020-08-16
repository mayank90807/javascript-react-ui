/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Snackbar, withStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import WarningIcon from '@material-ui/icons/Warning';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const DEFAULT_STATE = {
  status: '',
  show: false,
  message: '',
  timeOut: 2000,
};


const statusIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = (theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconStatus: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const SnackBarContext = React.createContext(DEFAULT_STATE);

class SnackBarProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, DEFAULT_STATE);
  }


  customSnackbarContent = () => {
    const { classes } = this.props;
    const { message, status } = this.state;
    const Icon = statusIcon[status];

    return (
      <SnackbarContent
        className={classes[status]}
        message={(
          <span className={classes.message}>
            <Icon className={classes.iconStatus} />
            {message}
          </span>
        )}
        action={[
          <IconButton key="close" color="inherit" onClick={this.closeHandle}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    );
  }

  handleOpen = (message, status) => {
    this.setState({
      message,
      status,
      show: true,
    });
  }

  closeHandle = (event, reason) => {
    this.setState({
      show: false,
    });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    const { show, message, status } = this.state;
    return (
      <SnackBarContext.Provider value={{
        handleOpen: this.handleOpen,
      }}
      >

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={show}
          autoHideDuration={5000}
          onClose={this.closeHandle}

        >
          {this.customSnackbarContent(status, message)}
        </Snackbar>
        {children}
      </SnackBarContext.Provider>
    );
  }
}

export const SnackBarConsumer = SnackBarContext.Consumer;
export default withStyles(styles)(SnackBarProvider);
