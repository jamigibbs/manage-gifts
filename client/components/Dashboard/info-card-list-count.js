import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography } from '@material-ui/core'

const styles = theme => ({
  card: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    marginTop: '25px',
    maxWidth: '300px'
  }
})

const InfoCardListCount = ({classes, lists}) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          variant="h6"
          align="center"
          color="textSecondary" gutterBottom>
          Total Lists Created
        </Typography>
        <Typography variant="h3" component="h3" align="center">
          {lists.length}
        </Typography>
      </CardContent>
    </Card>
  )
}

InfoCardListCount.propTypes = {
  classes: PropTypes.object.isRequired,
  lists: PropTypes.arrayOf(PropTypes.object).isRequired
}

const mapStateToProps = (state) => {
  return {
    lists: state.list.userLists
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(InfoCardListCount))
