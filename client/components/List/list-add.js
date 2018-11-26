import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNewList } from '../../actions'
import { withStyles } from '@material-ui/core/styles'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemText } from '@material-ui/core'

const styles = theme => ({
  root: {
    flex: '1 1 auto',
    padding: '0 16px',
    minWidth: 0,
  },
  listItemText: {
    color: '#C2C6CB'
  }
})

export class ListAdd extends Component {

  state = {
    open: false,
    name: ''
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
    this.props.addNewList(this.state.name, this.props.userId)
    this.handleClose()

    this.setState({ name: '' })
  }

  render(){
    const { classes } = this.props


    return (
      <div className={classes.root}>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Add New List"
          onClick={this.handleClickOpen} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="add-new-list-form-title"
        >
          <DialogTitle id="add-new-list-form-title">Add New List</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the name of the list you'd like to add
            </DialogContentText>
            <TextField
              onChange={this.handleChange('name')}
              value={this.state.name}
              autoFocus
              margin="dense"
              id="name"
              label="List Name"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
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
    addNewList: (name, userId) => {
      dispatch(addNewList(name, userId))
    }
  }
}

ListAdd.propTypes = {
  addNewList: PropTypes.func,
  userId: PropTypes.number,
  classes: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListAdd))
