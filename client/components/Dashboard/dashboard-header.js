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

  const match = matchPath(history.location.pathname, {
    path: '/dashboard/list/:listName/:listId',
    exact: true,
    strict: false
  })

  // Display list name in header
  if (match && match.params.listId) {
    const listId = parseInt(match.params.listId)
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
