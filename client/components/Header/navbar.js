import './navbar.scss'

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { logout } from '../../actions'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  logo: {
    flexGrow: 1,
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  button: {
    padding: 0,
    marginLeft: '20px'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
})

const Navbar = ({handleClick, isLoggedIn, classes}) => (

  <div className={classes.root}>

  <div className="nav-main">
  <AppBar position="relative" className={classes.appBar}>
  <Toolbar>
    <Typography variant="h6" color="inherit" className={classes.logo}>
      <Link to="/">Manage Gifts</Link>
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

  </div>
)

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

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
