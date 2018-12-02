import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core'

const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    marginTop: '25px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
})

const InfoBox = ({classes, title, content}) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          variant="h5"
          color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography
          component="p"
          color="textSecondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  )
}

InfoBox.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(InfoBox)

