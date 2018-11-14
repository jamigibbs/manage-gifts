import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import history from '../history'

import { updateCurrentListId, getListsForuser } from '../actions'
import ListSelectDialog from './list-select-dialog'

import { Button, Typography } from '@material-ui/core'

class ListSelect extends Component {
  state = {
    open: false,
    selectedList: 'None',
    listId: null
  }

  componentDidMount = () => {
    this.props.getListsForuser(this.props.userId)
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = (name, id) => {
    this.setState({ selectedList: name, listId: id, open: false })
    this.props.updateCurrentListId(id)
  }

  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.handleClickOpen}>Select List</Button>
        <ListSelectDialog
          selectedList={this.state.selectedList}
          open={this.state.open}
          onClose={this.handleClose}
          lists={this.props.userLists}
        />
        <br />
        <Typography variant="h6">
          { this.props.currentId && 'List ID ' + this.props.currentId }
        </Typography>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userLists: state.list.userLists,
    currentId: state.list.currentId,
    userId: state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentListId: (listId) => {
      dispatch(updateCurrentListId(listId))
    },
    getListsForuser: (userId) => {
      dispatch(getListsForuser(userId))
    }
  }
}

ListSelectDialog.propTypes = {
  userLists: PropTypes.array,
  userId: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSelect)
