import React, {Component} from 'react'
import ReceiverGiftsList from './receiver-gifts-list'
import ReceiverName from './receiver-name'
import { Typography } from '@material-ui/core';

class ReceiverDetails extends Component {
  render(){
    const receiverId = parseInt(this.props.match.params.receiverId)
    return(
      <div>
        <Typography variant="h5" ><ReceiverName id={receiverId} /></Typography>
        <ReceiverGiftsList receiverId={receiverId} />
      </div>
    )
  }
}

export default ReceiverDetails
