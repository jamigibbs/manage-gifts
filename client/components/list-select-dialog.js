import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'

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
  
  strToLowercaseDashed = (str) => {
    return str.replace(/\s+/g, '-').toLowerCase()
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
              <Link key={list.id} to={`/list/${this.strToLowercaseDashed(list.name)}/${list.id}`} >
                <ListItem
                  button
                  onClick={() => this.handleListItemClick(list.name, list.id)}
                >
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={list.name} />
                </ListItem>
              </Link>
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
    prevId: state.list.prevId,
    userLists: state.list.userLists,
    currentId: state.list.currentId
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
