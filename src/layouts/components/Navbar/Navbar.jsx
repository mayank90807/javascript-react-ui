/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { LocalStorageOps } from '../../../hoc';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  logoutButton: {
    marginLeft: theme.spacing(4),
  },
  Button: {
    textDecoration: 'none',
    color: 'white',
  },
  title: {
    flexGrow: 1,
  },
});

class Navbar extends React.PureComponent {
  state = { logoutRedirect: false };

  logoutHandle = () => {
    const { deleteItem } = this.props;
    deleteItem('token');
    this.setState({
      logoutRedirect: true,
    });
  }

  render() {
    const { logoutRedirect } = this.state;
    if (logoutRedirect) {
      return (<Redirect to="/login" />);
    }
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Trainee Portal
            </Typography>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button className={classes.Button}>
                Trainee
              </Button>
            </Link>

            <Link to="/textfield" style={{ textDecoration: 'none' }}>
              <Button className={classes.Button}>
                TEXTFIELD DEMO
              </Button>
            </Link>

            <Link to="/input" style={{ textDecoration: 'none' }}>
              <Button className={classes.Button}>
                INPUT DEMO
              </Button>
            </Link>
            <Link to="/children" style={{ textDecoration: 'none' }}>
              <Button className={classes.Button}>
                CHILDREN DEMO
              </Button>
            </Link>
            <Button onClick={this.logoutHandle} color="inherit" className={classes.logoutButton}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default LocalStorageOps(withStyles(styles)(Navbar));
