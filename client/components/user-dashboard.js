import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReceiverAdd from './receiver-add'
import ReceiversList from './receivers-list'

/**
 * COMPONENT
 */
export const UserDashboard = props => {
  const {email} = props

  return (
    <div>
      <h2>Welcome, {email}</h2>
      <ReceiverAdd listId={1} auth={email} />
      <ReceiversList listId={1} auth={email} />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserDashboard)

/**
 * PROP TYPES
 */
UserDashboard.propTypes = {
  email: PropTypes.string
}
