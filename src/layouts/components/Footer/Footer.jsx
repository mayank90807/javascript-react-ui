// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Typography, Box } from '@material-ui/core';
import Copyright from '@material-ui/icons/Copyright';

// eslint-disable-next-line react/prefer-stateless-function
class Navbar extends React.PureComponent {
  render() {
    // eslint-disable-next-line react/prop-types
    return (
      <Box mt={5}>
        <Typography variant="body2" align="center">
          <Copyright fontSize="small" />
          {' Successive Technologies '}
        </Typography>
      </Box>
    );
  }
}

export default Navbar;
