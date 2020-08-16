/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable react/forbdata-prop-types */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import {
  TableSortLabel, IconButton, TableFooter, TablePagination, LinearProgress,
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';


const style = theme => ({
  root: {
    margin: theme.spacing(2, 3),
    overflowX: 'auto',
  },
  table: {
    minWdatath: 650,
  },
  alternateRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: grey[100],
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
});


class TableComponent extends React.PureComponent {
  renderColumns = (columns) => {
    const { order, orderBy } = this.props;
    const rows = columns.map(({ label, align, field }) => {
      if (!label) {
        label = field;
      }
      return (
        // <TableCell key={label} align={align}>{label}</TableCell>
        <TableCell key={field} align={align}>
          <TableSortLabel
            active={orderBy === field}
            direction={order}
            onClick={this.createSortHandler(field)}
          >
            {label}
          </TableSortLabel>
        </TableCell>
      );
    });
    return <TableRow>{rows}</TableRow>;
  };

  createSortHandler = property => (event) => {
    const { onSort } = this.props;
    onSort(event, property);
  };

  renderActions = (data) => {
    const { actions } = this.props;
    if (actions) {
      const ActionButtons = actions.map(({ icon, handler }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={`action${data._id}${index}`}>
          <IconButton
            onClick={event => handler(event, data)}
          >
            {icon}
          </IconButton>
        </React.Fragment>
      ));
      return ActionButtons;
    }
    return null;
  }

  renderData = (columns, data) => {
    const { classes, onSelect } = this.props;
    const tableData = data.map(rows => (
      <TableRow
        hover
        className={classes.alternateRow}
        // eslint-disable-next-line no-underscore-dangle
        key={rows._id}
        onClick={event => onSelect(event, rows)}
      >
        {columns.map(({ field, format, align }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TableCell key={`${rows[field]}${index}`} align={align}>
            {!format ? rows[field] || '--' : format(rows[field] || '--')}
          </TableCell>
        ))}
        <TableCell align="right">
          {this.renderActions(rows)}
        </TableCell>

      </TableRow>
    ));
    return tableData;
  };

  render() {
    const { props } = this;
    const {
      columns, data, classes, count, rowsPerPage, page, onChangePage, loader,
    } = props;
    return (
      <>
        <Paper className={classes.root}>
          { loader && <LinearProgress /> }
          <Table className={classes.table}>
            <TableHead>{this.renderColumns(columns)}</TableHead>
            <TableBody>{this.renderData(columns, data)}</TableBody>
            { count > 0
              && (
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={count}
                      page={page}
                      onChangePage={onChangePage}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[]}
                    />
                  </TableRow>
                </TableFooter>
              )
            }
          </Table>
        </Paper>
      </>
    );
  }
}

TableComponent.defaultProps = {
  orderBy: '',
  order: 'asc',
  classes: {},
  page: 0,
  rowsPerPage: 10,

};

TableComponent.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      label: PropTypes.string,
      align: PropTypes.oneOf(['left', 'right', 'center']),
      format: PropTypes.func,
    }),
  ).isRequired,
  data: PropTypes.array.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  classes: PropTypes.object,
  actions: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
};

export default withStyles(style)(TableComponent);
