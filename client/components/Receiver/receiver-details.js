import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import ReceiverGiftsList from './receiver-gifts-list'
import ReceiverGiftAdd from './receiver-gift-add'
import ReceiverName from './receiver-name'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    padding: '15px'
  },
  header: {
    fontWeight: 'bold'
  }
})

class ReceiverDetails extends Component {
  render(){
    const { classes } = this.props
    const receiverId = parseInt(this.props.match.params.receiverId)
    return(
      <div>
        <div className={classes.root}>
          <Typography
            variant="h6"
            className={classes.header}
            >
            Gifts for <ReceiverName id={receiverId} />
          </Typography>
        </div>

        <ReceiverGiftAdd receiverId={receiverId} />

        <ReceiverGiftsList receiverId={receiverId} />
      </div>
    )
  }
}

export default withStyles(styles)(ReceiverDetails)
