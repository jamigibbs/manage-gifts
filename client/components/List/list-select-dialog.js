import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { updatePreviousListId } from '../../actions'
import { strToLowercaseDashed } from '../../utilities'

import { withStyles } from '@material-ui/core/styles'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, DialogTitle, Dialog, Typography } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import { blue } from '@material-ui/core/colors'

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  paper: {
    borderRadius: 0
  },
  notice: {
    padding: '40px'
  },
  noticeHeader: {
    marginBottom: '20px'
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
        classes={{ paper: classes.paper }}
        fullWidth={true}
        onClose={this.handleClose}
        aria-labelledby="list-select-title"
        open={open}
      >
        <div>
          { !lists.length ? (
            <div className={classes.notice}>
              <Typography variant="h5" className={classes.noticeHeader}>No Gift Lists Yet</Typography>
              <Typography variant="body1">You don't seem to have any gift lists yet.</Typography>
              <Typography variant="body1">Add one by selecting <strong>Create New List</strong> from the sidebar.</Typography>
            </div>
           ) : (
            <div>
            <DialogTitle id="list-select-title">Select List</DialogTitle>
            <List>
            {lists.map(list => (
              <Link key={list.id} to={`/dashboard/list/${strToLowercaseDashed(list.name)}/${list.id}`} >
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
           )}

        </div>
      </Dialog>
    )
  }
}

ListSelectDialog.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  lists: PropTypes.array,
  selectedList: PropTypes.string,
  updatePreviousListId: PropTypes.func,
  prevId: PropTypes.number,
  currentId: PropTypes.number,
  userLists: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
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
