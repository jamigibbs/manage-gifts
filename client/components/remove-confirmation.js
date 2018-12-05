import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core/'

class RemoveConfirmation extends Component {
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
    this.props.handleRemove()
    this.handleClose
  }

  render() {
    const { title, content, buttonRemove } = this.props
    return (
      <div>
        <Button color="secondary" onClick={this.handleClickOpen}>{buttonRemove ? ( buttonRemove ) : ( 'Remove' )}</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="receiver-gift-delete"
          aria-describedby="receiver-gift-delete-dialog"
        >
          <DialogTitle id="receiver-gift-delete">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="receiver-gift-delete-dialog">
              {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleRemove} color="secondary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

RemoveConfirmation.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired,
  buttonRemove: PropTypes.string
}

export default RemoveConfirmation
