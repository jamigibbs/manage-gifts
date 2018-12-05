import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from '../../utilities'
import { removeReceiverFromList } from '../../actions'
import RemoveConfirmation from '../remove-confirmation'

const ReceiverRemove = ({listId, receiverId, removeReceiverFromList}) => {

  const handleRemove = () => {
    removeReceiverFromList(listId, receiverId)
  }

  return (
    <div>
      <RemoveConfirmation
        title="Are you sure you want to remove this receiver?"
        content="When you remove them, all of their associated gifts will be removed too."
        handleRemove={handleRemove} />
    </div>
  )
}

const loadingSelector = createLoadingSelector(['REMOVE_RECEIVER_FROM_LIST'])

ReceiverRemove.propTypes = {
  listId: PropTypes.number,
  receiverId: PropTypes.number,
  removeReceiverFromList: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    isLoading: loadingSelector(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeReceiverFromList: (listId, receiverId) => {
      dispatch(removeReceiverFromList(listId, receiverId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverRemove)
