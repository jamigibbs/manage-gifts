import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import { Login, Signup, UserDashboard, Home } from './components'
import PrivateRoute from './routes-private'
import { me } from './actions'

class Routes extends Component {

  componentDidMount() {
    this.props.loadInitialData()
    //console.log(this.state.isLoggedIn)
  }

  isLoggedInCookie() {
    return (Cookies.get('mg_iLI') === "true")
  }

  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Switch>
        <PrivateRoute
          authed={this.isLoggedInCookie()}
          path='/dashboard'
          component={UserDashboard}
        />
        </Switch>
        {/* Displays our Home component as a fallback */}
        <Route component={Home} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  //isLoggedIn: PropTypes.bool.isRequired
}
