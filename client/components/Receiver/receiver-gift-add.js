import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addGiftToReceiver } from '../../actions'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

export class ReceiverGiftAdd extends Component {

  state = {
    open: false,
    url: ''
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false, url: '' })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = () => {
    this.props.addGiftToReceiver(this.state.url, this.props.receiverId)
    this.handleClose()
  }

  render(){

    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>Add Gift Idea</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="add-new-gift-form-title"
        >
          <DialogTitle id="add-new-gift-form-title">Paste Link to Gift Idea</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Paste the link of the gift idea you'd like to add
            </DialogContentText>
            <TextField
              onChange={this.handleChange('url')}
              value={this.state.name}
              autoFocus
              margin="dense"
              id="gift-link"
              label="Gift Link"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

ReceiverGiftAdd.propTypes = {
  addGiftToReceiver: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return {
    addGiftToReceiver: (url, receiverId) => {
      dispatch(addGiftToReceiver(url, receiverId))
    }
  }
}

export default connect(null, mapDispatchToProps)(ReceiverGiftAdd)
