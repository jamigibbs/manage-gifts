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

const loadingSelector = createLoadingSelector(['TOGGLE_GIFT_STATUS'])

ReceiveGiftToggle.propTypes = {
  gift: PropTypes.object,
  toggleGiftStatus: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    isLoading: loadingSelector(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleGiftStatus: (gift) => {
      dispatch(toggleGiftStatus(gift))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveGiftToggle)
