/* eslint-disable no-param-reassign */
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { LoginPage } from './pages';
import theme from './theme';
import SnackBarProvider from './contexts';
import {
  Trainee,
  TextFieldDemo,
  InputDemo,
  ChildrenDemo,
  NotFound,
} from './pages';
import { PrivateRoute, AuthRoute } from './routes';
import './App.css';

axios.interceptors.request.use((config) => {
  config.headers = { Authorization: localStorage.getItem('token') };
  return config;
},
error => Promise.reject(error));

//

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: localStorage.getItem('token'),
  },
});

function App() {
  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <SnackBarProvider>
            <BrowserRouter>
              <Switch>
                <PrivateRoute exact path="/textfield" component={TextFieldDemo} />
                <PrivateRoute exact path="/input" component={InputDemo} />
                <PrivateRoute exact path="/children" component={ChildrenDemo} />
                <AuthRoute exact path="/login" component={LoginPage} />
                <PrivateRoute path="/trainee" component={Trainee} />
                <Redirect to="/trainee" />
                <PrivateRoute component={NotFound} />
              </Switch>
            </BrowserRouter>
          </SnackBarProvider>
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
}

export default App;
