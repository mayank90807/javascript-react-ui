/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { AddDialog, EditDialog, RemoveDialog } from './components';
import { Table } from '../../components';
import { withSnackBarConsumer, LocalStorageOps, withLoaderAndMessage } from '../../hoc';

const EnhancedTable = withLoaderAndMessage(Table);

class TraineeList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openRegisterDialog: false,
      openEditDialog: false,
      openRemoveDialog: false,
      order: 'asc',
      orderBy: '',
      redirect: false,
      currentUser: {},
      page: 0,
      AddTraineeLoading: false,
      EditTraineeLoading: false,
      RemoveTraineeLoading: false,
      TableLoading: true,
      TableData: [],
      limit: 200,
      skip: 0,
      count: 100,
    };
  }

  componentDidMount() {
    this.renderTableFromApi();
  }


  renderTableFromApi = async () => {
    const { handleOpen, client } = this.props;
    const { limit, skip } = this.state;
    this.setState({
      TableLoading: true,
    });
    const GET_TRAINEES = gql`
      query trainees($skip: Int, $limit: Int){
        trainees(skip: $skip, limit: $limit) {
          count
          records{
            name
            email
            originalId
            _id
            createdAt
            role
          }
        }
      }
    `;

    try {
      const { data } = await client.query({
        query: GET_TRAINEES,
        variables: { skip, limit },
      });
      this.setState({
        TableLoading: false,
        TableData: data.trainees.records,
        count: data.trainees.count,
      });
    } catch (err) {
      this.setState({
        TableLoading: false,
      });
      handleOpen(err.graphQLErrors[0].message, 'error');
    }
  }

  handleClickOpen = dialogName => () => {
    this.setState({
      [dialogName]: true,
    });
  };

  handleCloseDialog = dialogName => () => {
    this.setState({
      [dialogName]: false,
    });
  };

  handleSubmit = async (obj) => {
    console.log(obj);
    // eslint-disable-next-line react/prop-types
    const CREATE_TRAINEE = gql`
    mutation createTrainee($name:String, $email: String, $password: String) {
      createTrainee(name: $name, email: $email, password: $password) {
        message
        data{
          name
          email
        }
      }
    }
    `;
    const { handleOpen, client } = this.props;
    this.setState({
      AddTraineeLoading: true,
    });
    try {
      const { data } = await client.mutate({
        mutation: CREATE_TRAINEE,
        variables: obj,
      });
      console.log(data.createTrainee.message);
      this.setState({
        AddTraineeLoading: false,
        openRegisterDialog: false,
      });
      handleOpen(data.createTrainee.message, 'success');
    } catch (err) {
      console.log(err);
      this.setState({
        AddTraineeLoading: false,
      });
      handleOpen(err.graphQLErrors[0].message, 'error');
    }
  };

  handleEditSubmit = async (obj) => {
    console.log(obj);
    const { handleOpen, client } = this.props;
    const { currentUser } = this.state;
    console.log(currentUser);
    const id = currentUser.originalId;
    const { email, name } = obj;

    const UPDATE_TRAINEE = gql`
    mutation updateTrainee($id: ID, $name: String, $email: String) {
      updateTrainee(id: $id, name: $name, email: $email) {
        message
        data{
          name
          email
        }
      }
    }
    `;
    this.setState({
      EditTraineeLoading: true,
    });
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_TRAINEE,
        variables: { id, name, email },
      });
      this.setState({
        EditTraineeLoading: false,
        openEditDialog: false,
      });
      handleOpen(data.updateTrainee.message, 'success');
      this.renderTableFromApi();
    } catch (err) {
      this.setState({
        EditTraineeLoading: false,
        openEditDialog: false,
      });
      console.log(err);
      if (err.graphQLErrors) {
        handleOpen(err.graphQLErrors[0].message, 'error');
      }
    }
  };

  handleDeleteSubmit = async (obj) => {
    const { handleOpen, client } = this.props;
    const id = obj._id;
    const DELETE_TRAINEE = gql`
    mutation deleteTrainee($id: ID) {
      deleteTrainee(id: $id) {
        message
        data{
          name
          email
        }
      }
    }
    `;
    this.setState({
      RemoveTraineeLoading: true,
    });
    try {
      const { data } = await client.mutate({
        mutation: DELETE_TRAINEE,
        variables: { id },
      });
      this.setState({
        RemoveTraineeLoading: false,
        openRemoveDialog: false,
      });
      handleOpen(data.deleteTrainee.message, 'success');
      this.renderTableFromApi();
    } catch (err) {
      console.log(err);
      if (err.graphQLErrors) {
        handleOpen(err.graphQLErrors[0].message, 'error');
      }
    }
  };

  getDateFormatted = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

  handleEditDialogOpen = (event, obj) => {
    event.stopPropagation();
    this.setState({
      openEditDialog: true,
      currentUser: obj,
    });
  }


  handleRemoveDialogOpen = (event, obj) => {
    event.stopPropagation();
    this.setState({
      openRemoveDialog: true,
      currentUser: obj,
    });
  }

  handleSort = (event, property) => {
    const { orderBy, order } = this.state;
    const isDesc = orderBy === property && order === 'desc';
    this.setState({
      order: isDesc ? 'asc' : 'desc',
      orderBy: property,
    });
  };

  handleTableClick = (event, obj) => {
    this.setState({
      redirect: true,
      currentUser: obj,
    });
  };

  handleChangePage = (event, newPage) => {
    let { skip } = this.state;
    const { limit } = this.state;
    skip = limit * newPage;
    this.setState({
      page: newPage,
      skip,
    }, this.renderTableFromApi);
  }

  render() {
    const { props } = this;
    const {
      openRegisterDialog,
      openEditDialog,
      openRemoveDialog,
      order,
      orderBy,
      redirect,
      currentUser,
      page,
      AddTraineeLoading,
      EditTraineeLoading,
      RemoveTraineeLoading,
      TableLoading,
      TableData,
      limit,
      count,
    } = this.state;
    const { match } = props;
    if (redirect) {
      return <Redirect to={`${match.url}/${currentUser._id}`} />;
    }
    return (
      <>
        <div>
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={this.handleClickOpen('openRegisterDialog')}
              style={{ margin: '5px 24px' }}
            >
              Add TraineeList
            </Button>
            <AddDialog
              loading={AddTraineeLoading}
              open={openRegisterDialog}
              onClose={this.handleCloseDialog}
              onSubmit={this.handleSubmit}
            />
          </Grid>
          <Grid item xs={12}>
            <br />
            <EnhancedTable
              id="sdasd"
              columns={[
                {
                  label: 'Name',
                  align: 'center',
                  field: 'name',
                },
                {
                  label: 'Email Address',
                  align: 'left',
                  field: 'email',
                  format: value => value && value.toUpperCase(),
                },
                {
                  label: 'Date',
                  align: 'right',
                  field: 'createdAt',
                  format: this.getDateFormatted,
                },
              ]}
              data={TableData}
              rowsPerPage={limit}
              order={order}
              orderBy={orderBy}
              onSort={this.handleSort}
              count={count}
              page={page}
              onChangePage={this.handleChangePage}
              onSelect={this.handleTableClick}
              actions={[
                {
                  icon: <EditIcon />,
                  handler: this.handleEditDialogOpen,
                },
                {
                  icon: <DeleteIcon />,
                  handler: this.handleRemoveDialogOpen,
                },
              ]}
              loader={TableLoading}

            />
            {
              openEditDialog && (
              <EditDialog
                open={openEditDialog}
                onClose={this.handleCloseDialog('openEditDialog')}
                onSubmit={this.handleEditSubmit}
                userData={currentUser}
                loading={EditTraineeLoading}
              />
              )
            }

            {
              openRemoveDialog && (
              <RemoveDialog
                open={openRemoveDialog}
                onClose={this.handleCloseDialog('openRemoveDialog')}
                onSubmit={this.handleDeleteSubmit}
                userData={currentUser}
                loading={RemoveTraineeLoading}
              />
              )
            }
          </Grid>
        </div>
      </>
    );
  }
}

export default withApollo(LocalStorageOps(withSnackBarConsumer(TraineeList)));
