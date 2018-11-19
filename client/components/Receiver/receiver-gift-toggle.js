import React, { Component } from 'react'
import { Checkbox } from '@material-ui/core/'

class ReceiveGiftToggle extends Component {
  
  state = {
    checkedB: true
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked })
  }
  
  render() {
    return (
      <div>
        <Checkbox
          checked={this.state.checkedB}
          onChange={this.handleChange('checkedB')}
          value="checkedB"
          color="default"
        />
      </div>
    )
  }
}

export default ReceiveGiftToggle
