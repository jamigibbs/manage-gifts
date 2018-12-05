import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector, isURL } from '../../utilities'
import USNumberFormat from '../us-number-format'
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
    gift: '',
    price: ''
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false, gift: '', price: '' })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = () => {
    if (!this.state.gift) return null

    const giftData = {
      gift: {
        name: this.state.gift,
        price: this.state.price
      },
      receiverId: this.props.receiverId,
      isUrl: isURL(this.state.gift)
    }
    this.props.addGiftToReceiver(giftData)
    this.handleClose()
  }

  render(){
    const { classes } = this.props
    const { gift, price, open } = this.state
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
          open={open}
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
              value={gift}
              autoFocus
              margin="dense"
              id="gift-input"
              label="Gift Link or Name"
              type="text"
              fullWidth
            />
            <TextField
              required={true}
              onChange={this.handleChange('price')}
              value={price}
              InputProps={{
                inputComponent: USNumberFormat
              }}
              margin="dense"
              id="price-input"
              label="Price"
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
    addGiftToReceiver: (giftData) => {
      dispatch(addGiftToReceiver(giftData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReceiverGiftAdd))
