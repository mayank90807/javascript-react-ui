/* eslint-disable react/prop-types */
import React from 'react';
import { CircularProgress, Box, Typography } from '@material-ui/core';

const withLoaderAndMessage = WrappedComponent => (props) => {
  const { data, loader } = props;
  if (loader === true) {
    return (
      <Typography component="div">
        <Box textAlign="center" m={1}>
          <CircularProgress />
        </Box>
      </Typography>
    );
  }
  if (data.length === 0) {
    return (
      <Typography component="div">
        <Box textAlign="center" m={1}>
          oops! No more Trainees.
        </Box>
      </Typography>
    );
  }
  return <WrappedComponent {...props} />;
};

export default withLoaderAndMessage;
