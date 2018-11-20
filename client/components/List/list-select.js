import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateCurrentListId, getListsForuser } from '../../actions'
import ListSelectDialog from './list-select-dialog'
import ListName from './list-name'

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
    const { userLists, currentId } = this.props
    return (
      <div>
        <Button variant="contained" onClick={this.handleClickOpen}>Select List</Button>
        <ListSelectDialog
          selectedList={this.state.selectedList}
          open={this.state.open}
          onClose={this.handleClose}
          lists={userLists}
        />
        <br />
        <Typography variant="h6">
          { currentId && userLists.length &&
            <ListName listId={currentId} userLists={userLists} />
          }
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
  currentId: PropTypes.number,
  userId: PropTypes.number,
  updateCurrentListId: PropTypes.func,
  getListsForuser: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSelect)
