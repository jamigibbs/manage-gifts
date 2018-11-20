import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import NotesIcon from '@material-ui/icons/Notes'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import LogoutIcon from '@material-ui/icons/LastPage'

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
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}>
          <Typography variant="h6">Manage Gifts</Typography>
        </div>
        <List>
          <ListItem button>
            <ListItemIcon><MoreHorizIcon /></ListItemIcon>
            <ListItemText primary="Add New List" />
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
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Sidebar)
