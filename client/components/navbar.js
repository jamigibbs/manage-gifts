import './navbar.scss'

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { logout } from '../actions'

import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    fontWeight: 100
  }
};

const Navbar = ({handleClick, isLoggedIn, classes}) => (
  <div className={classes.root}>

  <AppBar position="static" className="nav-main">
  <Toolbar>
    <Typography variant="h6" color="inherit" className={classes.grow}>
      <Link to="/">Gift Manager</Link>
    </Typography >
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Button color="inherit" className={classes.button}>
            <NavLink to="/dashboard" activeClassName="nav-main__active">Dashboard</NavLink>
          </Button>
          <Button onClick={handleClick} color="inherit">
            Logout
          </Button>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Button color="inherit" className={classes.button}>
            <NavLink to="/login" activeClassName="nav-main__active">Login</NavLink>
          </Button>
          <Button color="inherit" className={classes.button}>
            <NavLink to="/signup" activeClassName="nav-main__active">Sign Up</NavLink>
          </Button>
        </div>
      )}
    </nav>
    </Toolbar>
    </AppBar>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(withStyles(styles)(Navbar)))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
