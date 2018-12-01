import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from '../../utilities'
import { removeReceiverFromList } from '../../actions'
import { Button } from '@material-ui/core/'

class ReceiverActions extends Component {

  handleRemove = () => {
    const { listId, receiverId } = this.props
    this.props.removeReceiverFromList(listId, receiverId)
  }

  render(){
    return (
      <div>
        <Button color="secondary" onClick={this.handleRemove}>Remove</Button>
      </div>
    )
  }
}

const loadingSelector = createLoadingSelector(['REMOVE_RECEIVER_FROM_LIST'])

ReceiverActions.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverActions)
