import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { updateCurrentListId } from '../actions'
import { withStyles } from '@material-ui/core/styles'

import { ReceiversList, ReceiverDetails } from './Receiver'
import { Sidebar } from './Sidebar'
import { DashboardHeader } from './Dashboard'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1
  },
  header: {
    fontWeight: 'bold',
    margin: '20px 0 40px 0'
  }
})

export class UserDashboard extends Component {
  constructor(){
    super()
  }

  componentWillReceiveProps = (newProps) => {
    // Re-setting active list state when on root /dashboard view
    if (newProps.location.pathname === this.props.match.path) {
      this.props.updateCurrentListId(null)
    }
  }

  render(){
    const { email, classes, userLists, currentId } = this.props

    return (
      <div className={classes.root}>
        <Sidebar />
        <main className={classes.content}>

        { userLists.length &&
          <DashboardHeader
            name={email}
            userLists={userLists}
            currentId={currentId} />
        }

          <Switch>
            <Route
              exact path={'/dashboard/list/:listName/:listId'}
              render={(props) => <ReceiversList {...props} /> }
            />
            <Route
              exact path={'/dashboard/list/:listId/receiver/:receiverName/:receiverId'}
              render={(props) => <ReceiverDetails {...props} /> }
            />
          </Switch>

        </main>
      </div>
    )
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    isLoggedIn: !!state.user.id,
    userLists: state.list.userLists,
    currentId: state.list.currentId
  }
}

const mapProps = dispatch => {
  return {
    updateCurrentListId: (listId) => {
      dispatch(updateCurrentListId(listId))
    }
  }
}

UserDashboard.propTypes = {
  email: PropTypes.string,
  classes: PropTypes.object.isRequired,
  currentListId: PropTypes.func
}

export default connect(mapState, mapProps)(withStyles(styles)(UserDashboard))
