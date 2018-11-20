import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { ReceiverGiftAdd, ReceiverGiftDelete, ReceiverGiftToggle } from '../Receiver'
import { getAllReceiverGifts } from '../../actions'
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core/'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  }
})

class ReceiverGiftsList extends Component {

  componentDidMount(){
    this.props.getAllReceiverGifts(this.props.receiverId)
  }

  render(){
    const { classes, receiverId } = this.props
    return (
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Purchased</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell numeric>Actions</TableCell>
            <TableCell numeric><ReceiverGiftAdd receiverId={receiverId} /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.gifts.map(gift => {
            return (
              <TableRow key={gift.id}>
                <TableCell><ReceiverGiftToggle gift={gift}/></TableCell>
                <TableCell><img src={gift.item.image} width="50" /></TableCell>
                <TableCell component="th" scope="row">
                  <a href={gift.item.url} target="_blank"  rel="noopener">{gift.item.name}</a>
                </TableCell>
                <TableCell numeric>
                  <ReceiverGiftDelete itemId={gift.id} receiverId={receiverId} />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
    )
  }
}

ReceiverGiftsList.propTypes = {
  gifts: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object,
  receiverId: PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    gifts: state.receivers.gifts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllReceiverGifts: (receiverId) => {
      dispatch(getAllReceiverGifts(receiverId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReceiverGiftsList))
