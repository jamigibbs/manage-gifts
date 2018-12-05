import React from 'react';
import PropTypes from 'prop-types'
import history from '../history'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const styles = theme => ({
  backButton: {
    marginTop: theme.spacing.unit * 2
  }
})

const BackButton = ({text, classes}) => {
  return (
    <Button
      onClick={history.goBack}
      size="small"
      variant="contained"
      className={classes.backButton}>
      {text}
    </Button>
  )
}

BackButton.propTypes = {
  text: PropTypes.string.isRequired
}

export default withStyles(styles)(BackButton)
