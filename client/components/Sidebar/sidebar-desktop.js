import React from 'react';
import PropTypes from 'prop-types'
import { createLoadingSelector } from '../../utilities'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
    margin: '20px 0 0 25px'
  },
  logoLink: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer'
    }
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

function SidebarDesktop (props) {
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
          <Typography variant="h6" className={classes.logo}>
          <Link to="/dashboard" className={classes.logoLink}>Manage Gifts</Link>
          </Typography>
        </div>
        <List>
          <ListItem button classes={{ button: classes.listItem }}>
            <ListItemIcon><ListSelectIcon className={classes.icon}/></ListItemIcon>
            <ListSelect />
          </ListItem>
          <ListItem button classes={{ button: classes.listItem }}>
            <ListItemIcon className={classes.icon}><AddListIcon /></ListItemIcon>
            <ListAdd />
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

SidebarDesktop.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const loadingSelector = createLoadingSelector(['LOGOUT_USER'])

const mapStateToProps = state => {
  return {
    isFetching: loadingSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout() {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SidebarDesktop))
