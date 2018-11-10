import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeReceiverFromList } from '../actions'
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

const mapDispatchToProps = (dispatch) => {
  return {
    removeReceiverFromList: (listId, receiverId) => {
      dispatch(removeReceiverFromList(listId, receiverId))
    }
  }
}

export default connect(null, mapDispatchToProps)(ReceiverActions)
