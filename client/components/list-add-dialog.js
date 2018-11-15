import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ListAddDialog extends Component {
  render(){
    return (
      
    )
  }  
}

const mapStateToProps = (state) => {
  return {
     userLists: state.list.userLists
  }
}

export default connect(mapStateToProps, null)(ListAddDialog)

