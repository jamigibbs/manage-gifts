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
    name: 'None'
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
              value={this.state.name}
              onChange={this.handleChange}
              input={<Input name="name" id="name-helper" />}
            >
              <MenuItem value="None"><em>None</em></MenuItem>
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
