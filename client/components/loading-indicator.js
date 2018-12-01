import './loading-indicator.scss'
import React, { Component } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'

export class LoadingIndicator extends Component {

  render(){
    return (
      <div className="loading">
        <LinearProgress />
      </div>
    )
  }
}

export default LoadingIndicator
