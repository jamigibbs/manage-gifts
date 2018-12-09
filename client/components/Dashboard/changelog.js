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
  },
  date: {
    marginBottom: theme.spacing.unit
  },
  details: {
    marginLeft: theme.spacing.unit * 3,
  },
  content: {
    marginBottom: theme.spacing.unit * 3
  },
  button: {
    display: 'inline-block',
    marginLeft: theme.spacing.unit * 3,
    padding: '2px 8px',
    borderRadisu: '2px',
    fontSize: '12px',
    backgroundColor: 'gray',
    color: 'white'
  },
  button__new: {
    backgroundColor: '#FF9900',
  },
  button__improvements: {
    backgroundColor: '#00A7F7'
  },
  button__fixes: {
    backgroundColor: '#47B04B'
  }
})

class Changelog extends React.Component {
  state = {
    changelog: []
  }

  componentDidMount () {
    axios.get('http://localhost:8080/changelog.json')
      .then((res) => {
        this.setState({changelog: res.data.changelog})
      })
  }

  buttonClass(type, classes) {
    switch(type) {
      case 'new':
        return classes.button__new
      case 'fixes':
        return classes.button__fixes
      case 'improvements':
        return classes.button__improvements
      default:
        return ''
    }
  }

  render(){
    const { classes } = this.props
    const { changelog } = this.state
    return (
      <List className={classes.root} subheader={<li />}>
      <Typography className={classes.header} variant="h6" gutterBottom>Release Notes</Typography>

        {changelog.map(log => (

          <li key={`section-${log.id}`} className={classes.listSection}>

            <ul className={classes.ul}>

              <ListSubheader className={classes.subheader}>
              <span>v{log.id} - {log.title}</span>
              <Typography variant="overline" className={classes.date}>{log.date}</Typography>
              </ListSubheader>

              {log.details.map((detail) => (
                <div key={`item-${log.id}-${detail.type}`} className={classes.content}>
                  <Typography variant="button" className={ classes.button + ' ' + this.buttonClass(detail.type, classes)}>
                    {detail.type}
                  </Typography>

                  {detail.items.map(item => (
                    <ListItem alignItems="flex-start" key={`item-${log.id}-${item.id}`} className={classes.listItem}>
                      <ListItemText primary={item.info} />
                    </ListItem>
                  ))}
                </div>
              ))}
            </ul>
          </li>
        ))}
      </List>
    )
  }
}

Changelog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Changelog)
