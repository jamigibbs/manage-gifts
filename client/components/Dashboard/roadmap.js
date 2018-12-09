import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, ListSubheader, Typography } from '@material-ui/core'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 400,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0
  },
  header: {
    marginLeft: theme.spacing.unit * 3,
    padding: '10px 0',
    fontWeight: 'bold',
  },
  subheader: {
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.8)',
    lineHeight: 1,
    paddingTop: theme.spacing.unit
  }
})

class Roadmap extends React.Component {
  state = {
    roadmap: []
  }

  componentDidMount () {
    axios.get('/roadmap.json')
      .then((res) => {
        this.setState({roadmap: res.data.roadmap})
      })
  }

  render(){
    const { classes } = this.props
    const { roadmap } = this.state
    return (
      <List className={classes.root} subheader={<li />}>
      <Typography className={classes.header} variant="h6" gutterBottom>Features Roadmap</Typography>

        {roadmap.map(log => (

          <li key={`section-${log.type}`} className={classes.listSection}>

            <ul className={classes.ul}>

              <ListSubheader className={classes.subheader}>
              {log.type}
              </ListSubheader>

              {log.details.map((detail) => (
                <ListItem alignItems="flex-start" key={`item-${log.type}-${detail.id}`} className={classes.listItem}>
                  <ListItemText primary={detail.info} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    )
  }
}

Roadmap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Roadmap)
