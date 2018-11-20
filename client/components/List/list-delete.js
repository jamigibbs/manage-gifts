import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteList, updatePreviousListId } from '../../actions'
import history from '../../history'

import { withStyles } from '@material-ui/core/styles'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
})

export class ListDelete extends Component {

  state = {
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleDelete = () => {
    const { listId, userId } = this.props
    this.props.deleteList(listId, userId)
    this.props.updatePreviousListId(null)
    this.handleClose()
    history.push('/dashboard')
  }

  render(){
    const { classes } = this.props

    return (
      <div>
        <Button
          className={classes.button}
          color="secondary"
          onClick={this.handleClickOpen}>
          Delete List
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="delete-list"
          aria-describedby="delete-list"
        >
          <DialogTitle id="delete-list-title">Warning: Deleting List Data</DialogTitle>
          <DialogContent>
            <DialogContentText>
              When you delete a list, all added receivers and their associated gifts will be removed too. Are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="secondary" onClick={this.handleDelete}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteList: (listId, userId) => {
      dispatch(deleteList(listId, userId))
    },
    updatePreviousListId: (id) => {
      dispatch(updatePreviousListId(id))
    }
  }
}
ListDelete.propTypes = {
  deleteList: PropTypes.func,
  updatePreviousListId: PropTypes.func,
  userId: PropTypes.number,
  classes: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListDelete))
