import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { matchPath } from 'react-router'
import history from '../../history'
import { ListName } from '../List'

const styles = theme => ({
  root: {
    backgroundColor: 'white',
    padding: '15px'
  },
  header: {
    fontWeight: 'bold',
    margin: '20px 0 40px 0'
  }
})

const DashboardHeader = ({name, userLists, classes}) => {

  const matchList = matchPath(history.location.pathname, {
    path: '/dashboard/list/:listName/:listId',
    exact: true,
    strict: false
  })

  const matchReceiver = matchPath(history.location.pathname, {
    path: '/dashboard/list/:listId/receiver/:receiverName/:receiverId',
    exact: true,
    strict: false
  })

  if (userLists.length === 0) {
    return (
      <div className={classes.root}>
        <Typography
          variant="h4"
          className={classes.header}>
          Hello, {name}
        </Typography>
      </div>
    )
  }

  // Display list name in header
  if (matchList && matchList.params.listId) {
    const listId = parseInt(matchList.params.listId)
    return (
      <div className={classes.root}>
        <Typography
          variant="h4"
          className={classes.header}>
          <ListName
            listId={listId}
            userLists={userLists}
          />
        </Typography>
      </div>
    )
  }

  if (matchReceiver && matchReceiver.params.listId) {
    const listId = parseInt(matchReceiver.params.listId)
    return (
      <div className={classes.root}>
        <Typography
          variant="h4"
          className={classes.header}>
          <ListName
            listId={listId}
            userLists={userLists}
          />
        </Typography>
      </div>
    )
  }

  // Starting dashboard view user welcome header
  return (
    <div className={classes.root}>
      <Typography
        variant="h4"
        className={classes.header}>
        Hello, {name}
      </Typography>
    </div>
  )
}

export default withStyles(styles)(DashboardHeader)
