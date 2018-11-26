import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import ReceiverGiftsList from './receiver-gifts-list'
import ReceiverGiftAdd from './receiver-gift-add'
import ReceiverName from './receiver-name'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
  },
  header: {
    fontWeight: 'bold',
    marginLeft: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
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

          <ReceiverGiftAdd receiverId={receiverId} />
        </div>

        <ReceiverGiftsList receiverId={receiverId} />
      </div>
    )
  }
}

export default withStyles(styles)(ReceiverDetails)
