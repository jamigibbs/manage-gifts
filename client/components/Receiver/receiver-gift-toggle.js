import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from '../../utilities'
import { Checkbox } from '@material-ui/core/'
import { toggleGiftStatus } from '../../actions'

class ReceiveGiftToggle extends Component {

  handleChange = name => event => {
    this.props.toggleGiftStatus(this.props.gift)
  }

  render() {
    const { gift } = this.props
    return (
      <div>
        <Checkbox
          checked={gift.purchased}
          onChange={this.handleChange()}
          value="checkedB"
          color="default"
        />
      </div>
    )
  }
}

ReceiveGiftToggle.propTypes = {
  gift: PropTypes.object,
  toggleGiftStatus: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleGiftStatus: (gift) => {
      dispatch(toggleGiftStatus(gift))
    }
  }
}

export default connect(null, mapDispatchToProps)(ReceiveGiftToggle)
