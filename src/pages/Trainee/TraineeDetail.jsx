/* eslint-disable react/prop-types */
import React from 'react';
import {
  withStyles,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';
import trainees from './data/trainee';
import { NotFound } from '../index';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: theme.spacing(3),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 160,
  },
  button: {
    marginLeft: theme.spacing(3),
  },
});
class TraineeDetail extends React.PureComponent {
  getDateFormatted = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

  renderCard() {
    const { classes, match } = this.props;
    // match.params.id
    const index = trainees.findIndex(element => element.id === match.params.id);
    if (index === -1) {
      return <NotFound />;
    }

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image="/images/profile.png"
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {trainees[index].name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {this.getDateFormatted(trainees[index].createdAt)}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {trainees[index].email}
            </Typography>
          </CardContent>
        </div>
      </Card>
    );
  }


  render() {
    const { classes } = this.props;
    return (
      <>
        {this.renderCard()}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button color="primary" className={classes.button}>
            &lt; Back to Trainee List
          </Button>
        </Link>
      </>
    );
  }
}

export default withStyles(styles)(TraineeDetail);
