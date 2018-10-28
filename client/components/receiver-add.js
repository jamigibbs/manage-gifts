import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReceiver } from '../actions'

class ReceiverAdd extends Component {
  constructor(props){
    super()
    this.state = {
      name: '',
      listId: props.listId
    }
  }

  onFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onFormSubmit(event) {
    event.preventDefault()
    this.props.addReceiver(this.state, this.props.auth)
    this.resetFormState()
  }

  resetFormState() {
    this.setState({
      name: ''
    })
  }

  render(){
    const { name } = this.state
    return(
      <div>
        <h3>Add new receiver</h3>
        <form
          onChange={(event) => this.onFormChange(event)}
          onSubmit={(event) => this.onFormSubmit(event)}
        >
          <label htmlFor="name">Receiver Name</label>
          <input type="text" name="name" value={name} />
          <button type="submit">Add Receiver</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    receivers: state.receivers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addReceiver: (receiver, auth) => {
      dispatch(addReceiver(receiver, auth))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverAdd)
