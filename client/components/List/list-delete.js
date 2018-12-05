import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from '../../utilities'
import { deleteList, updatePreviousListId } from '../../actions'
import history from '../../history'
import RemoveConfirmation from '../remove-confirmation'

const ListDelete = ({listId, userId, deleteList, updatePreviousListId}) => {

  const handleRemove = () => {
    deleteList(listId, userId)
    updatePreviousListId(null)
    history.push('/dashboard')
  }

  return (
    <div>
      <RemoveConfirmation
        title="Warning: Deleting List Data"
        content="When you delete a list, all added receivers and their associated gifts will be removed too. Are you sure?"
        buttonRemove="Remove List"
        handleRemove={handleRemove} />
    </div>
  )
}

ListDelete.propTypes = {
  deleteList: PropTypes.func.isRequired,
  updatePreviousListId: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  listId: PropTypes.number.isRequired
}

const loadingSelector = createLoadingSelector(['DELETE_LIST, UPDATE_PREVIOUS_LIST_ID'])

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
    isLoading: loadingSelector(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteList: (listId, userId) => {
      dispatch(deleteList(listId, userId))
    },
    updatePreviousListId: (id) => {
      dispatch(updatePreviousListId(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDelete)
