import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReceiver } from '../actions'

export class ReceiverAdd extends Component {
  constructor(props){
    super()
    this.state = {
      name: ''
    }
  }

  onFormChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onFormSubmit(event) {
    event.preventDefault()
    this.props.addReceiver(this.state.name, this.props.currentListId)
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
          <input type="text" name="name" value={name} onChange={this.onFormChange('name')}/>
          <button type="submit">Add Receiver</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    receivers: state.receivers,
    currentListId: state.list.currentId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addReceiver: (receiver, listId) => {
      dispatch(addReceiver(receiver, listId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverAdd)
