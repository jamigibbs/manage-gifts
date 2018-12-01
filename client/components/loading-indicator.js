import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = theme => ({
  loading: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'fixed',
    display: 'block',
    opacity: 0.9,
    backgroundColor: 'white',
    zIndex: 99
  }
})

export class LoadingIndicator extends Component {

  render(){
    const { classes } = this.props
    return (
      <div className={classes.loading}>
        <LinearProgress />
      </div>
    )
  }
}

export default withStyles(styles)(LoadingIndicator)
