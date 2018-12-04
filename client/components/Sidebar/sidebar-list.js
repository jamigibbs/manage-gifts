import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { ListAdd, ListSelect } from '../List'
import { List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ListSelectIcon from '@material-ui/icons/ListAlt'
import AddListIcon from '@material-ui/icons/PlaylistAdd'
import LogoutIcon from '@material-ui/icons/LastPage'

const styles = theme => ({
  icon: {
    color: '#C2C6CB'
  },
  listItem: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  },
  listItemText: {
    color: '#C2C6CB'
  },
  divider: {
    backgroundColor: '#686C73'
  },
  listItemText: {
    color: '#C2C6CB'
  }
})

const SidebarList = ({logout, handleListItemClick, classes}) => {
  return(
    <div>
      <List>
        <ListItem button classes={{ button: classes.listItem }} onClick={handleListItemClick}>
          <ListItemIcon><ListSelectIcon className={classes.icon}/></ListItemIcon>
          <ListSelect />
        </ListItem>
        <ListItem button classes={{ button: classes.listItem }} onClick={handleListItemClick}>
          <ListItemIcon className={classes.icon}><AddListIcon /></ListItemIcon>
          <ListAdd />
        </ListItem>
      </List>
      <Divider light={true} classes={{ root: classes.divider }} />
      <List>
        <ListItem button classes={{ button: classes.listItem }} onClick={handleListItemClick}>
          <ListItemIcon><LogoutIcon className={classes.icon}/></ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Logout"
            onClick={logout}
          />
        </ListItem>
      </List>
    </div>
  )
}

export default (withStyles(styles)(SidebarList))
