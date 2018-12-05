import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from '../../utilities'
import RemoveConfirmation from '../remove-confirmation'
import { removeGiftFromReceiver } from '../../actions'

const ReceiverGiftDelete = ({itemId, removeGiftFromReceiver}) => {

  const handleRemove = () => {
    removeGiftFromReceiver(itemId)
  }

  return (
    <div>
      <RemoveConfirmation
        title="Are you sure you want to delete this gift idea?"
        content={`Confirm to remove this gift from your receiver's gift list`}
        handleRemove={handleRemove} />
    </div>
  )
}

const loadingSelector = createLoadingSelector(['REMOVE_GIFT_FROM_RECEIVER'])

ReceiverGiftDelete.propTypes = {
  itemId: PropTypes.number.isRequired,
  removeGiftFromReceiver: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isLoading: loadingSelector(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeGiftFromReceiver: (itemId) => {
      dispatch(removeGiftFromReceiver(itemId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverGiftDelete)
