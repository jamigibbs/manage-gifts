import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { createLoadingSelector } from '../utilities'
import { updateCurrentListId } from '../actions'
import { withStyles } from '@material-ui/core/styles'
import { Hidden } from '@material-ui/core'
import LoadingIndicator from './loading-indicator'
import { allFalseValues } from '../utilities'

import { ReceiversList, ReceiverDetails } from './Receiver'
import { SidebarDesktop, SidebarMobile } from './Sidebar'
import { DashboardHeader, DashboardRoot } from './Dashboard'
import Footer from './footer'

const styles = theme => ({
  root: {
    display: 'flex'
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
    const { name, classes, userLists, currentId, loading } = this.props

    return (
      <div className={classes.root}>

        <Hidden smDown>
          <SidebarDesktop />
        </Hidden>

        <main className={classes.content+ ' ' +'footer-push'}>

          <Hidden smUp>
            <SidebarMobile/>
          </Hidden>

          { !allFalseValues(loading) && <LoadingIndicator /> }

          <DashboardHeader
            name={name}
            userLists={userLists}
            currentId={currentId} />

          <Switch>
            <Route
              exact path={'/dashboard'}
              render={(props) => <DashboardRoot {...props} /> }
            />
            <Route
              exact path={'/dashboard/list/:listName/:listId'}
              render={(props) => <ReceiversList {...props} /> }
            />
            <Route
              exact path={'/dashboard/list/:listId/receiver/:receiverName/:receiverId'}
              render={(props) => <ReceiverDetails {...props} /> }
            />
          </Switch>

          <Footer />

        </main>
      </div>
    )
  }
}

const loadingSelector = createLoadingSelector(['UPDATE_CURRENT_LIST_ID'])

const mapState = state => {
  return {
    name: state.user.name,
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
