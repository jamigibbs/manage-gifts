import './list-select.scss'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

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
    this.setState({ [event.target.name]: event.target.value });
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
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(ListSelect)
