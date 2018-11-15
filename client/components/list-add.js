import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewList } from '../actions'
import history from '../history'
import { strToLowercaseDashed } from '../utilities'

import { getCurrentListId } from '../actions'

import { withStyles } from '@material-ui/core/styles'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

const styles = theme => ({
  root: {
    marginBottom: '20px',
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
  }
  
  componentWillUnmount = () => {
    console.log(this.props)
    // console.log('this.props', this.props.userLists.length)
    // console.log('prevProps', prevProps.userLists.length)
    
    // if (prevProps.userLists.length > this.props.userLists.length) {
    //   history.push(`/dashboard/list/${strToLowercaseDashed(this.state.name)}/${this.props.currentId}`)
    // }
  }

  render(){
    const { classes } = this.props
    
    // if (currentId !== prevId) { 
    //   history.push(`/dashboard/list/${strToLowercaseDashed(this.state.name)}/${currentId}`)
    // }
    
    return (
      <div className={classes.root}>
        <Button variant="contained" onClick={this.handleClickOpen}>Add New List</Button>
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
    // userId: state.user.id,
     currentId: state.list.currentId,
     userLists: state.list.userLists
    //prevId: state.list.prevId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewList: (name, userId) => {
      dispatch(addNewList(name, userId))
    },
    // getCurrentListId: () => {
    //   dispatch(getCurrentListId())
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListAdd))
