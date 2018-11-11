import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { getAllListReceivers, updateCurrentListId } from '../actions'
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
    const listId = this.props.match.params.listId
    this.props.getAllListReceivers(parseInt(listId))
    this.props.updateCurrentListId(parseInt(listId))
  }

  componentDidUpdate = (prevProps) => {
    const listId = this.props.match.params.listId
    if (listId !== prevProps.match.params.listId) {
      this.props.getAllListReceivers(parseInt(listId))
      this.props.updateCurrentListId(parseInt(listId))
    }
  }

  render(){
    const { receivers, classes, match } = this.props
    const { listId } = match.params
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
                        <TableCell component="th" scope="row">{receiver.name}</TableCell>
                        <TableCell numeric>3</TableCell>
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
    receivers: state.receivers.allFromList
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
