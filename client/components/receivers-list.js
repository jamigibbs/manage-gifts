import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllListReceivers } from '../actions'

class ReceiversList extends Component {

  componentDidUpdate = (prevProps) => {
    if (this.props.listId !== prevProps.listId) {
      this.props.getAllListReceivers(this.props.listId)
    }
  }

  render(){
    const { receivers, listId } = this.props
    return (
      <div>
        <h3>List {listId} Receivers</h3>
        <ul>
          { receivers.length &&
            receivers.map(function(receiver){
              return <li key={receiver.id}>{receiver.name}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    receivers: state.receivers.allFromList,
    listId: state.list.currentId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllListReceivers: (listId) => {
      dispatch(getAllListReceivers(listId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiversList)
