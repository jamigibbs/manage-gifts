import React, { Component } from 'react'
import { connect } from 'react-redux'
import { } from '../actions'
import { withStyles } from '@material-ui/core/styles'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

export class ReceiverGiftAdd extends Component {

  state = {
    open: false,
    link: ''
  }

  componentDidMount = () => {

  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = () => {
    //this.props.addNewList(this.state.name, this.props.userId)
    this.handleClose()
    this.setState({ link: '' })
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
              onChange={this.handleChange('link')}
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

export default connect(null, null)(ReceiverGiftAdd)
