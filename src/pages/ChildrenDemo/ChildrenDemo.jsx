/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Math, Table } from '../../components/index';

class ChildrenDemo extends React.PureComponent {
  render() {
    const template = ({
      first, second, operator, result,
    }) => {
      console.log({
        first,
        second,
        operator,
        result,
      });
      return (
        <Typography variant="h5">
          {first} {operator} {second} = {result}
        </Typography>
      );
    };

    return (
      <>
        <div style={{ margin: '30px' }}>
          <Math first={1} second={0} operator="^">
            {template}
          </Math>
          <br />
          <Math first={2} second={0} operator="/">
            {template}
          </Math>
          <br />
          <Math first={9} second={10} operator="+">
            {template}
          </Math>
          <br />
        </div>
      </>
    );
  }
}

export default ChildrenDemo;
