import React, {Component} from 'react'

class ReceiverDetails extends Component {
  render(){
    const { receiverId } = this.props.match.params
    console.log(this.props)
    return(
      <div>
        <p>Receiver #{receiverId} Details</p>
      </div>
    )
  }
}

export default ReceiverDetails
