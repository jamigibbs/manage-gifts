import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

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

export const UserDashboard = props => {
  const {email, classes} = props

  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        <Typography variant="h4" align="center">Welcome, {email}</Typography>
        <ReceiverAdd listId={1} auth={email} />
        <ReceiversList listId={1} auth={email} />
      </main>
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.email
  }
}

UserDashboard.propTypes = {
  email: PropTypes.string,
  classes: PropTypes.object.isRequired
}

export default connect(mapState, null)(withStyles(styles)(UserDashboard))
