import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { createLoadingSelector } from '../../utilities'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListSelectIcon from '@material-ui/icons/ListAlt'
import AddListIcon from '@material-ui/icons/PlaylistAdd'
import LogoutIcon from '@material-ui/icons/LastPage'

import { ListAdd, ListSelect } from '../List'
import { logout } from '../../actions'

const drawerWidth = 260;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#30363D',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#30363D'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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

class SidebarMobile extends React.Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  }

  handleDrawerClose = () => {
    this.setState({ open: false });
  }

  handleListItemClick = () => {
    this.setState({open: false})
  }

  render() {
    const { classes, theme, logout } = this.props
    const { open } = this.state
    return (
      <div className={classes.root}>

        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              <Link to="/dashboard" className={classes.logoLink} onClick={this.handleListItemClick}>
                Manage Gifts
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon className={classes.icon} /> : <ChevronRightIcon className={classes.icon} />}
            </IconButton>
          </div>
          <Divider />
          <List>
          <ListItem button classes={{ button: classes.listItem }} onClick={this.handleListItemClick}>
            <ListItemIcon><ListSelectIcon className={classes.icon}/></ListItemIcon>
            <ListSelect />
          </ListItem>
          <ListItem button classes={{ button: classes.listItem }} onClick={this.handleListItemClick}>
            <ListItemIcon className={classes.icon}><AddListIcon /></ListItemIcon>
            <ListAdd />
          </ListItem>
        </List>
        <Divider light={true} classes={{ root: classes.divider }} />
        <List>
          <ListItem button classes={{ button: classes.listItem }} onClick={this.handleListItemClick}>
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
    );
  }
}

SidebarMobile.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(SidebarMobile))
