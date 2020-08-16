import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthLayout } from '../layouts';

class AuthRoute extends React.PureComponent {
  render() {
    const { ...rest } = this.props;
    if (localStorage.token) {
      return (<Redirect to="/trainee" />);
    }
    return (
      <AuthLayout>
        <Route {...rest} />
      </AuthLayout>
    );
  }
}

export default AuthRoute;
