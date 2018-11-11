import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { updatePreviousListId } from '../actions'

import { withStyles } from '@material-ui/core/styles'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, DialogTitle, Dialog } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import { blue } from '@material-ui/core/colors'

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
}

class ListSelectDialog extends Component {

  handleClose = () => {
    this.props.onClose(this.props.selectedList, this.props.prevId)
  }

  handleListItemClick = (name, listId) => {
    this.props.updatePreviousListId(listId)
    this.props.onClose(name, listId)
  }

  render() {
    const { classes, lists, open } = this.props

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="list-select-title"
        open={open}
      >
        <DialogTitle id="list-select-title">Select List</DialogTitle>
        <div>
          <List>
            {lists.map(list => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(list.name, list.id)}
                key={list.id}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={list.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    )
  }
}

ListSelectDialog.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  lists: PropTypes.array,
  selectedList: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    prevId: state.list.prevId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePreviousListId: (id) => {
      dispatch(updatePreviousListId(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListSelectDialog))
