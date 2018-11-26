import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Typography, Button } from '@material-ui/core'
import NotesIcon from '@material-ui/icons/Notes'
import AddListIcon from '@material-ui/icons/PlaylistAdd'
import LogoutIcon from '@material-ui/icons/LastPage'

import { ListAdd } from '../List'
import { logout } from '../../actions'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar
})

function Sidebar (props) {
  const { classes, logout } = props

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar}>
          <Typography variant="h6">Manage Gifts</Typography>
        </div>
        <List>
          <ListItem button>
            <ListItemIcon><AddListIcon /></ListItemIcon>
            {/* <ListItemText primary="Add New List" /> */}
            <ListAdd />
          </ListItem>
          <ListItem button>
            <ListItemIcon><NotesIcon /></ListItemIcon>
            <ListItemText primary="Select List" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" onClick={logout} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    logout() {
      dispatch(logout())
    }
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Sidebar))
