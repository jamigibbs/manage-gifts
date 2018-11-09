import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCurrentListId, getListsForuser } from '../actions'

import { withStyles } from '@material-ui/core/styles'
import { Select, FormControl, InputLabel, MenuItem, Input } from '@material-ui/core'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    minWidth: 150,
  }
})

export class ListSelect extends Component {

  state = {
    id: 0
  }

  componentDidMount = () => {
    this.props.getListsForuser(this.props.userId)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
    this.props.updateCurrentListId(event.target.value)
  }

  render() {
    const { classes, userLists } = this.props

    return (
      <div className="list-select-form">
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-helper">List Name</InputLabel>
            <Select
              value={this.state.id}
              onChange={this.handleChange}
              input={<Input name="id" id="name-helper" />}
            >
              <MenuItem value={0}><em>None</em></MenuItem>
              {
                userLists.map((list) => {
                  return <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userLists: state.list.userLists,
    userId: state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentListId: (listId) => {
      dispatch(updateCurrentListId(listId))
    },
    getListsForuser: (userId) => {
      dispatch(getListsForuser(userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListSelect))
