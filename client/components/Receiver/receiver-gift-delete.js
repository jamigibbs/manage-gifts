import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from '../../utilities'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/'
import ReceiverName from './receiver-name'
import { removeGiftFromReceiver } from '../../actions'

class ReceiverGiftDelete extends Component {
  state = {
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleRemove = () => {
    const { itemId } = this.props
    this.props.removeGiftFromReceiver(itemId)
    this.handleClose()
  }

  render(){
    const { receiverId } = this.props
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>Remove</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="receiver-gift-delete"
          aria-describedby="receiver-gift-delete-dialog"
        >
          <DialogTitle id="receiver-gift-delete">{"Are you sure you want to delete this gift idea?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="receiver-gift-delete-dialog">
              Confirm to remove this gift from <ReceiverName id={receiverId} />'s gift list.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleRemove} color="primary" autoFocus>
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const loadingSelector = createLoadingSelector(['REMOVE_GIFT_FROM_RECEIVER'])

ReceiverGiftDelete.propTypes = {
  removeGiftFromReceiver: PropTypes.func,
  receiverId: PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    isLoading: loadingSelector(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeGiftFromReceiver: (itemId) => {
      dispatch(removeGiftFromReceiver(itemId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverGiftDelete)
