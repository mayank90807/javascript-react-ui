import React from 'react';
import { SnackBarConsumer } from '../contexts/SnackBarProvider/SnackBarProvider';

const withSnackBarConsumer = WrappedComponent => props => (
  <SnackBarConsumer>
    {({
      handleOpen,
    }) => {
      const snackBarProps = {
        handleOpen,
      };
      return <WrappedComponent {...snackBarProps} {...props} />;
    }}
  </SnackBarConsumer>
);

export default withSnackBarConsumer;
