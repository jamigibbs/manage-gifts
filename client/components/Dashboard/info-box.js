import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core'

const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    marginTop: '25px',
    whiteSpace: `pre-wrap`
  },
  content: {
    lineHeight: 1
  }
})

const InfoBox = ({classes, title, content}) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        {title &&
          <Typography
            variant="h5"
            color="textSecondary" gutterBottom>
            {title}
          </Typography>
          }

        { content &&
          <Typography
            className={classes.content}
            component="p"
            color="textSecondary">
            {content}
          </Typography>
        }
      </CardContent>
    </Card>
  )
}

InfoBox.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(InfoBox)

