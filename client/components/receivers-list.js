import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { getAllListReceivers } from '../actions'
import ReceiverActions from './receiver-actions'
import ListDelete from './list-delete'

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
    this.props.getAllListReceivers(this.props.listId)
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.listId !== prevProps.listId) {
      this.props.getAllListReceivers(this.props.listId)
    }
  }

  render(){
    const { receivers, listId, classes } = this.props
    return (
      <div>
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
    receivers: state.receivers.allFromList,
    listId: state.list.currentId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllListReceivers: (listId) => {
      dispatch(getAllListReceivers(listId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReceiversList))
