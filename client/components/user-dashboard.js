import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCurrentListId } from '../actions'

import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import ReceiverAdd from './receiver-add'
import ReceiversList from './receivers-list'
import Sidebar from './sidebar'

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
    this.props.getCurrentListId()
  }

  render(){
    const {email, classes, currentListId} = this.props
    if(!currentListId) return 'Loading...'
    return (
      <div className={classes.root}>
        <Sidebar />
        <main className={classes.content}>
          <Typography variant="h4" align="center">Welcome, {email}</Typography>
          <ReceiverAdd listId={currentListId} auth={email} />
          <ReceiversList listId={currentListId} auth={email} />
        </main>
      </div>
    ) 
  }
}

const mapState = state => {
  console.log(state)
  return {
    email: state.user.email,
    currentListId: state.list.currentId
  }
}

const mapProps = dispatch => {
  return {
    getCurrentListId: () => {
      dispatch(getCurrentListId())
    }
  }
}

UserDashboard.propTypes = {
  email: PropTypes.string,
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapProps)(withStyles(styles)(UserDashboard))
