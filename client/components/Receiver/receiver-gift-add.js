import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector, isURL } from '../../utilities'
import { addGiftToReceiver } from '../../actions'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

const styles = theme => ({
  button: {
    marginLeft: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  }
})

export class ReceiverGiftAdd extends Component {

  state = {
    open: false,
    gift: ''
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false, gift: '' })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = () => {
    if (!this.state.gift) return null

    const isUrl = isURL(this.state.gift)
    this.props.addGiftToReceiver(this.state.gift, this.props.receiverId, isUrl)
    this.handleClose()
  }

  render(){
    const { classes } = this.props
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleClickOpen}>
          Add a Gift Idea
        </Button>
        <Dialog
          open={this.state.open}
          fullWidth={true}
          onClose={this.handleClose}
          aria-labelledby="add-new-gift-form-title"
        >
          <DialogTitle id="add-new-gift-form-title">Add A Gift Idea</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can paste a link to the gift idea or simply enter some text. Using a valid link will automatically add an image and description though. 😎
            </DialogContentText>
            <TextField
              required={true}
              onChange={this.handleChange('gift')}
              value={this.state.gift}
              autoFocus
              margin="dense"
              id="gift-input"
              label="Gift Link or Name"
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

const loadingSelector = createLoadingSelector(['ADD_GIFT_TO_RECEIVER'])

ReceiverGiftAdd.propTypes = {
  addGiftToReceiver: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    isLoading: loadingSelector(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addGiftToReceiver: (gift, receiverId, isUrl) => {
      dispatch(addGiftToReceiver(gift, receiverId, isUrl))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReceiverGiftAdd))
