import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCurrentListId } from '../actions'

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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
    this.props.updateCurrentListId(event.target.value)
  }

  render() {
    const { classes } = this.props
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
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
            </Select>
          </FormControl>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentListId: state.list.currentId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentListId: (listId) => {
      dispatch(updateCurrentListId(listId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListSelect))
