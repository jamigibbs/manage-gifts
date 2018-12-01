import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { createLoadingSelector } from '../utilities'
import { updateCurrentListId } from '../actions'
import { withStyles } from '@material-ui/core/styles'
import LoadingIndicator from './loading-indicator'
import { allFalseValues } from '../utilities'

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

  // componentWillReceiveProps = (newProps) => {
  //   // Re-setting active list state when on root /dashboard view
  //   if (newProps.location.pathname === this.props.match.path) {
  //     this.props.updateCurrentListId(null)
  //   }
  // }

  render(){
    const { firstName, classes, userLists, currentId, loading } = this.props

    return (
      <div className={classes.root}>
        <Sidebar />
        <main className={classes.content}>

          { !allFalseValues(loading) && <LoadingIndicator /> }

          <DashboardHeader
            name={firstName}
            userLists={userLists}
            currentId={currentId} />

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

const loadingSelector = createLoadingSelector(['UPDATE_CURRENT_LIST_ID'])

const mapState = state => {
  return {
    firstName: state.user.firstName,
    isLoggedIn: !!state.user.id,
    userLists: state.list.userLists,
    currentId: state.list.currentId,
    loading: state.loading,
    isLoading: loadingSelector(state)
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
