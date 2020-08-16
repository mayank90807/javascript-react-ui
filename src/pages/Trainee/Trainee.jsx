/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-*/
/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

class Trainee extends React.PureComponent {
  render() {
    const { match } = this.props;
    return (
      <>
        <Switch>
          <Route exact path="/trainee/:id" component={TraineeDetail} />
          <Route exact path={`${match.url}`} component={TraineeList} />
        </Switch>
      </>
    );
  }
}

export default Trainee;
