import './loading-indicator.scss'
import React, { Component } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'

export class LoadingIndicator extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <div className="loading">
          <LinearProgress />
        </div>
      </div>
    )
  }
}

export default LoadingIndicator
