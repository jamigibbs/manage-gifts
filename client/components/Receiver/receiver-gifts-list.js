import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { ReceiverGiftAdd, ReceiverGiftDelete, ReceiverGiftToggle } from '../Receiver'
import { getAllReceiverGifts } from '../../actions'
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from '@material-ui/core/'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    borderRadius: 0
  },
  table: {
    minWidth: 700,
  },
  giftLink: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.87)',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  notice: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 3,
  }
})

class ReceiverGiftsList extends Component {

  componentDidMount(){
    this.props.getAllReceiverGifts(this.props.receiverId)
  }

  render(){
    const { classes, receiverId, gifts } = this.props

    if (gifts.length === 0 ) {
      return (
        <div>
          <Paper className={classes.notice}>
            <Typography variant="h6">Your Gift Receiver Has No Gifts Ideas Yet!</Typography>
            <Typography variant="body1">When you find gift ideas on the internet, simply click "Add a Gift Idea" and paste the link to start keeping track</Typography>
          </Paper>
        </div>
      )
    }

    return (
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Purchased</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell numeric>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gifts.map(gift => {
            return (
              <TableRow key={gift.id}>
                <TableCell><ReceiverGiftToggle gift={gift}/></TableCell>
                <TableCell><img src={gift.item.image} width="50" /></TableCell>
                <TableCell component="th" scope="row">
                  <a href={gift.item.url} className={classes.giftLink} target="_blank"  rel="noopener">{gift.item.name}</a>
                </TableCell>
                <TableCell numeric>
                  <ReceiverGiftDelete
                    itemId={gift.id}
                    receiverId={receiverId} />
                </TableCell>
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
