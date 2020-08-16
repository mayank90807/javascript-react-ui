/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  CircularProgress,
} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  buttonBody: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '55%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});
class RemoveDialog extends React.PureComponent {
  onSubmitButton = () => {
    const { onSubmit, userData } = this.props;
    onSubmit(userData);
  }


  render() {
    const {
      open,
      onClose,
      loading,
      classes,
    } = this.props;
    return (
      <>
        <Dialog open={open} maxWidth="md" fullWidth>
          <DialogTitle id="alert-dialog-title">
            Remove Trainee
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure if you want to remove this trainee?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <div className={classes.buttonBody}>
              <div className={classes.wrapper}>
                <Button color="primary" onClick={this.onSubmitButton} autoFocus>
                  Delete
                </Button>
                {loading && (
                  <CircularProgress size={24} className={classes.buttonProgress} />
                )}
              </div>
            </div>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
RemoveDialog.defaultProps = {};

RemoveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

export default withStyles(styles)(RemoveDialog);
