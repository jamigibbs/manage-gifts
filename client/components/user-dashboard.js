import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReceiverAdd from './receiver-add'

/**
 * COMPONENT
 */
export const UserDashboard = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <ReceiverAdd listId={1} auth={email}/>
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
