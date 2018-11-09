import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getCurrentListId } from '../actions'

import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

import ReceiverAdd from './receiver-add'
import ReceiversList from './receivers-list'
import Sidebar from './sidebar'
import ListSelect from './list-select'

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

  componentDidUpdate = (prevProps) => {
    if (this.props.currentListId !== prevProps.currentListId) {
      this.props.getCurrentListId()
    }
  }

  render(){
    const {email, classes, currentListId} = this.props
    return (
      <div className={classes.root}>
        <Sidebar />
        <main className={classes.content}>
          <Typography variant="h4" align="center">Welcome, {email}</Typography>

          { currentListId > 0 &&
            <ReceiverAdd listId={currentListId} />
          }

          <ListSelect />

          { currentListId > 0 ?
            <ReceiversList /> :
            <p>Select or create a list</p>
          }
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
    }
  }
}

UserDashboard.propTypes = {
  email: PropTypes.string,
  classes: PropTypes.object.isRequired,
  currentListId: PropTypes.number
}

export default connect(mapState, mapProps)(withStyles(styles)(UserDashboard))
