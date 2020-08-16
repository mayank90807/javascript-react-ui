/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  withStyles, Container, Typography,
} from '@material-ui/core';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: '#fff',
    },
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
class NotFound extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Container className={classes.root} maxWidth="sm">
          <Typography>
          <h1>Not Found</h1>
          <h6>Seems like you are lost.</h6>
          </Typography>
        </Container>
      </>
    );
  }
}
export default withStyles(styles)(NotFound);
