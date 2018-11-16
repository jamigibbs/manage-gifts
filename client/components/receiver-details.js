import React, {Component} from 'react'
import ReceiverGiftsList from './receiver-gifts-list'

class ReceiverDetails extends Component {
  render(){
    const { receiverId } = this.props.match.params
    return(
      <div>
        <p>Receiver #{receiverId} Details</p>
        <ReceiverGiftsList />
      </div>
    )
  }
}

export default ReceiverDetails
