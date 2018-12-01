import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from '../../utilities'
import { getReceiver } from '../../actions'

class ReceiverName extends Component {

  componentDidMount = () => {
    this.props.getReceiver(this.props.id)
  }

  render(){
    const name = this.props.currentReceiver.name
    return (
      <span>{ name }</span>
    )
  }

}

const loadingSelector = createLoadingSelector(['GET_RECEIVER'])

ReceiverName.propTypes = {
  currentReceiver: PropTypes.object,
  getReceiver: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    currentReceiver: state.receivers.currentReceiver,
    isLoading: loadingSelector(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReceiver: (id) => {
      dispatch(getReceiver(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverName)
