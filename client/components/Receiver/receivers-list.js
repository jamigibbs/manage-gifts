import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { createLoadingSelector, stableSort, getSorting } from '../../utilities'
import { getAllListReceivers, updateCurrentListId } from '../../actions'
import { strToLowercaseDashed } from '../../utilities'
import ReceiverRemove from './receiver-remove'
import ReceiverAdd from './receiver-add'
import ReceiversListHead from './receivers-list-head'
import { ListDelete } from '../List'

import { Typography, Table, TableBody, TableCell, TableRow, Paper } from '@material-ui/core/'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    borderRadius: 0
  },
  table: {
    minWidth: 700
  },
  receiver: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  notice: {
    marginLeft: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 3,
  },
  deleteButton: {
    float: 'right',
    marginBottom: '50px',
    marginTop: '20px'
  }
})

class ReceiversList extends Component {
  state = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    data: []
  }

  componentDidMount = () => {
    const { listId } = this.props.match.params
    this.props.getAllListReceivers(parseInt(listId))
    this.props.updateCurrentListId(parseInt(listId))
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy })
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.receivers !== nextProps.receivers) {
      const data = nextProps.receivers.map((receiver) => {
        const giftsCount = receiver.gifts ? this.giftsCount(receiver.gifts, receiver.id) : 0
        const purchasedCount = receiver.gifts ? this.purchasedCount(receiver.gifts, receiver.id) : 0
        return {
          id: receiver.id,
          name: receiver.name,
          giftsCount,
          purchasedCount
        }
      })

      this.setState({ data })
    }
  }

  componentDidUpdate = (prevProps) => {
    const { listId } = this.props.match.params
    if (listId !== prevProps.match.params.listId) {
      this.props.getAllListReceivers(parseInt(listId))
      this.props.updateCurrentListId(parseInt(listId))
    }
  }

  giftsCount = (gifts, id) => {
    return gifts.reduce((acc, gift) => {
      if (gift.receiverId === id) acc++
      return acc
    }, 0)
  }

  purchasedCount = (gifts, id) => {
    return gifts.reduce((acc, gift) => {
      if (gift.purchased && id == gift.receiverId) acc++
      return acc
    }, 0)
  }

  render(){
    const { receivers, classes, match } = this.props
    const { order, orderBy, data } = this.state
    const listId = parseInt(match.params.listId)

    if (receivers.length === 0 ) {
      return (
        <div className={classes.root}>
          <Paper className={classes.notice}>
            <Typography variant="h6">Nice work creating a new list!</Typography>
            <Typography variant="body1">Next you'll want to add names to the list below for the people you're finding gifts.</Typography>
          </Paper>
          <ReceiverAdd listId={listId} />

          <div className={classes.deleteButton} >
            <ListDelete listId={listId} />
          </div>
        </div>
      )
    }

    return (
      <div className={classes.root}>

        <ReceiverAdd listId={listId} />

        <Paper className={classes.root}>
          <Table className={classes.table}>

            <ReceiversListHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort} />

              <TableBody>
                {receivers &&
                  stableSort(data, getSorting(order, orderBy))
                  .map((receiver) => {
                    return (
                      <TableRow key={receiver.id}>
                        <TableCell component="th" scope="row">
                          <Link
                            className={classes.receiver}
                            to={`/dashboard/list/${listId}/receiver/${strToLowercaseDashed(receiver.name)}/${receiver.id}`}>
                            <Typography variant="body1">{receiver.name}</Typography>
                          </Link>
                        </TableCell>
                        <TableCell numeric>
                          {receiver.giftsCount}
                        </TableCell>
                        <TableCell numeric>
                          {receiver.purchasedCount}
                        </TableCell>
                        <TableCell>
                          <ReceiverRemove
                            receiverId={receiver.id}
                            listId={listId}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
          </Table>
        </Paper>
        <div className={classes.deleteButton} >
          <ListDelete listId={listId} />
        </div>
      </div>
    )
  }
}

ReceiversList.propTypes = {
  receivers: PropTypes.arrayOf(PropTypes.object),
  userLists: PropTypes.arrayOf(PropTypes.object),
  getAllListReceivers: PropTypes.func,
  updateCurrentListId: PropTypes.func,
  classes: PropTypes.object,
  match: PropTypes.object
}

const loadingSelector = createLoadingSelector(['GET_ALL_LIST_RECEIVERS, UPDATE_CURRENT_LIST_ID, GET_ALL_GIFTS_FOR_LIST'])

const mapStateToProps = (state) => {
  return {
    receivers: state.receivers.allFromList,
    userLists: state.list.userLists,
    isLoading: loadingSelector(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllListReceivers: (listId) => {
      dispatch(getAllListReceivers(listId))
    },
    updateCurrentListId: (listId) => {
      dispatch(updateCurrentListId(listId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReceiversList))
