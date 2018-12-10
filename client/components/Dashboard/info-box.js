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
  header: {
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  content: {
    lineHeight: 0.8,
    fontSize: '18px'
  }
})

const InfoBox = ({classes, title, content}) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        {title &&
          <Typography
            className={classes.header}
            variant="h5"
            gutterBottom>
            {title}
          </Typography>
          }

        { content &&
          <Typography
            className={classes.content}
            component="p">
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

