import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PrivateLayout } from '../layouts';

class PrivateRoute extends React.PureComponent {
  render() {
    const { ...rest } = this.props;
    if (!localStorage.token) {
      return (<Redirect to="/login" />);
    }
    return (
      <PrivateLayout>
        <Route {...rest} />
      </PrivateLayout>
    );
  }
}

export default PrivateRoute;
