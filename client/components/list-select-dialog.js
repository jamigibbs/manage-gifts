import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

  state = {
    prevId: null
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedList, this.state.prevId)
  }

  handleListItemClick = (name, listId) => {
    this.setState({ prevId: listId })
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

export default withStyles(styles)(ListSelectDialog)
