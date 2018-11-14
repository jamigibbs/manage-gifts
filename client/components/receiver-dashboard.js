import React, {Component} from 'react'

class ReceiverDashboard extends Component {
  render(){
    const { listId, receiverId } = this.props.match.params
    return(
      <div>
        Receiver Dashboard
      </div>
    )
  }
}

export default ReceiverDashboard
