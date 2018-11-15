import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { getCurrentListId, updateCurrentListId } from '../actions'

import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import ReceiversList from './receivers-list'
import ReceiverDetails from './receiver-details'
import Sidebar from './sidebar'
import ListSelect from './list-select'
import ListAdd from './list-add'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  }
})

export class UserDashboard extends Component {
  constructor(){
    super()
  }

  componentDidMount(){
    //this.props.getCurrentListId()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.currentListId !== prevProps.currentListId) {
      //this.props.getCurrentListId()
    }
  }

  componentWillReceiveProps = (newProps) => {
    // Re-setting active list state when on root /dashboard view
    if (newProps.location.pathname === this.props.match.path) {
      this.props.updateCurrentListId(null)
    }
  }

  render(){
    const { email, classes, userLists } = this.props
    return (
      <div className={classes.root}>
        <Sidebar />
        <main className={classes.content}>
          <Typography variant="h6" align="center">Welcome, {email}</Typography>

          <ListAdd />

          <ListSelect />

          <Switch>
            <Route
              exact path={'/dashboard/list/:listName/:listId'}
              render={(props) => <ReceiversList {...props} /> }
            />
            <Route
              exact path={'/dashboard/receiver/:receiverName/:receiverId'}
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
    currentListId: state.list.currentId
  }
}

const mapProps = dispatch => {
  return {
    getCurrentListId: () => {
      dispatch(getCurrentListId())
    },
    updateCurrentListId: (listId) => {
      dispatch(updateCurrentListId(listId))
    }
  }
}

UserDashboard.propTypes = {
  email: PropTypes.string,
  classes: PropTypes.object.isRequired,
  currentListId: PropTypes.number
}

export default connect(mapState, mapProps)(withStyles(styles)(UserDashboard))
