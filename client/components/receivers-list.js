import React, { Component } from 'react'

const receivers = {
  "all": [
    {"id": 1, "name": "Michael Scott", "listId": 1},
    {"id": 2, "name": "Jim Halpert", "listId": 1},
    {"id": 3, "name": "Angela Martin", "listId": 1},
    {"id": 4, "name": "Dwight Schrute", "listId": 1}
  ]
}

class ReceiversList extends Component {
  constructor(props){
    super()
    this.state = {
      receivers: receivers.all
    }
  }
  
  render(){
    const { receivers } = this.state
    return (
      <div>
        <h3>Receivers List</h3>
        <ul>
          {
            receivers.map(function(receiver){
              return <li key={receiver.id}>{receiver.name}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default ReceiversList
