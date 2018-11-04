import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../actions'

import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  }
};

const Navbar = ({handleClick, isLoggedIn, classes}) => (
  <div className={classes.root}>

  <AppBar position="static">
  <Toolbar>
  <Typography variant="h6" color="inherit" className={classes.grow}>
    Gift Manager
  </Typography >
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Button color="inherit"><Link to="/dashboard">Dashboard</Link></Button>
          <Button onClick={handleClick} color="inherit">
            Logout
          </Button>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Button color="inherit"><Link to="/login">Login</Link></Button>
          <Button color="inherit"><Link to="/signup">Sign Up</Link></Button>
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

export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
