import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getReceiver } from '../actions'


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

const mapStateToProps = (state) => {
  return {
    currentReceiver: state.receivers.currentReceiver
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
