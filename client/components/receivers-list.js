import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllListReceivers } from '../actions'

class ReceiversList extends Component {
  constructor(props){
    super()
  }

  componentDidMount(){
    const { listId } = this.props
    this.props.getAllListReceivers(listId)
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
    receivers: state.receivers.allFromList
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
