import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllReceivers } from '../actions'

class ReceiversList extends Component {
  constructor(props){
    super()
  }

  componentDidMount(){
    const { listId, auth } = this.props
    this.props.getAllReceivers(listId, auth)
  }

  render(){
    const { receivers } = this.props

    if (!receivers) {
      return 'Add a receiver'
    } else if (receivers.length === 0) {
      return 'Loading...'
    }

    return (
      <div>
        <h3>Receivers List</h3>
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
    receivers: state.receivers.all
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllReceivers: (listId, auth) => {
      dispatch(getAllReceivers(listId, auth))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiversList)
