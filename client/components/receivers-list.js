import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { getAllListReceivers, updateCurrentListId, getAllGiftsForList } from '../actions'
import { strToLowercaseDashed } from '../utilities'
import ReceiverActions from './receiver-actions'
import ListDelete from './list-delete'
import ReceiverAdd from './receiver-add'

import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core/'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
})

class ReceiversList extends Component {

  componentDidMount = () => {
    const { listId } = this.props.match.params
    this.props.getAllListReceivers(parseInt(listId))
    this.props.updateCurrentListId(parseInt(listId))
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.receivers !== nextProps.receivers) {
      const receiverIds = this.receiverIdsArray(nextProps.receivers)
      this.props.getAllGiftsForList(receiverIds)
    }
  }

  componentDidUpdate = (prevProps) => {
    const { listId } = this.props.match.params
    if (listId !== prevProps.match.params.listId) {
      this.props.getAllListReceivers(parseInt(listId))
      this.props.updateCurrentListId(parseInt(listId))
    }
  }

  receiverIdsArray = (receivers) => {
    if (receivers) {
      return receivers.map((receiver) => {
        return parseInt(receiver.id)
      })
    }
  }

  receiverGiftCount = (receiverId) => {
    return this.props.gifts.reduce((acc, gift) => {
      if (gift.receiverId === receiverId) acc++
      return acc
    }, 0)
  }

  render(){
    const { receivers, classes, match, gifts } = this.props
    const { listId } = match.params

    if (!receivers || !receivers.length ) {
      return (
        <div>
          Loading content...
        </div>
      )
    }

    return (
      <div>

        <ReceiverAdd listId={listId} />

        <Typography variant="subtitle1" >List {listId} Receivers</Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
                <TableRow>
                  <TableCell>Receiver Name</TableCell>
                  <TableCell numeric>Assigned Gifts</TableCell>
                  <TableCell>Actions</TableCell>
                  <TableCell numeric><ListDelete listId={listId} /></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receivers &&
                  receivers.map((receiver) => {
                    return (
                      <TableRow key={receiver.id}>
                        <TableCell component="th" scope="row">
                          <Link to={`/dashboard/receiver/${strToLowercaseDashed(receiver.name)}/${receiver.id}`}>
                            {receiver.name}
                          </Link>
                        </TableCell>
                        <TableCell numeric>
                        { this.receiverGiftCount(receiver.id) }
                        </TableCell>
                        <TableCell>
                          <ReceiverActions
                            receiverId={receiver.id}
                            listId={listId}
                          />
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    receivers: state.receivers.allFromList,
    gifts: state.list.gifts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllListReceivers: (listId) => {
      dispatch(getAllListReceivers(listId))
    },
    updateCurrentListId: (listId) => {
      dispatch(updateCurrentListId(listId))
    },
    getAllGiftsForList: (receiverIds) => {
      dispatch(getAllGiftsForList(receiverIds))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReceiversList))
