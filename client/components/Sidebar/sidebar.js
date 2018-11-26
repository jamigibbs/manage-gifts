import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import ListSelectIcon from '@material-ui/icons/ListAlt'
import AddListIcon from '@material-ui/icons/PlaylistAdd'
import LogoutIcon from '@material-ui/icons/LastPage'

import { ListAdd, ListSelect } from '../List'
import { logout } from '../../actions'

const drawerWidth = 260

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
    backgroundColor: '#30363D'
  },
  toolbar: theme.mixins.toolbar,
  logo: {
    color: 'white',
    fontWeight: 'bold',
    margin: '20px 0 0 25px'
  },
  icon: {
    color: '#C2C6CB'
  },
  listItem: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  },
  listItemText: {
    color: '#C2C6CB'
  },
  divider: {
    backgroundColor: '#686C73'
  }
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
          <Typography variant="h6" className={classes.logo}>Manage Gifts</Typography>
        </div>
        <List>
          <ListItem button classes={{ button: classes.listItem }}>
            <ListItemIcon className={classes.icon}><AddListIcon /></ListItemIcon>
            <ListAdd />
          </ListItem>
          <ListItem button classes={{ button: classes.listItem }}>
            <ListItemIcon><ListSelectIcon className={classes.icon}/></ListItemIcon>
            <ListSelect />
          </ListItem>
        </List>
        <Divider light={true} classes={{ root: classes.divider }} />
        <List>
          <ListItem button classes={{ button: classes.listItem }}>
            <ListItemIcon><LogoutIcon className={classes.icon}/></ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Logout"
              onClick={logout}
            />
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
