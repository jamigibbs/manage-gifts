import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createLoadingSelector } from '../../utilities'
import { addReceiver } from '../../actions'
import { Typography, TextField, Button } from '@material-ui/core'

const styles = theme => ({
  root: {
    backgroundColor: 'white',
    marginLeft: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 3,
  },
  header: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  body: {
    color: '#686C73'
  },
  form: {
    display: 'flex',
    height: '80%'
  },
  textField: {
    marginBottom: 0,
    marginRight: '10px'
  },
  submitButton: {
    alignSelf: 'flex-end'
  }
})

export class ReceiverAdd extends Component {
  constructor(props){
    super()
    this.state = {
      name: ''
    }
  }

  onFormChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  onFormSubmit(event) {
    event.preventDefault()
    if (!event.target.value) return null
    this.props.addReceiver(this.state.name, this.props.currentListId)
    this.resetFormState()
  }

  resetFormState() {
    this.setState({
      name: ''
    })
  }

  render(){
    const { name } = this.state
    const { classes } = this.props
    return(
      <div className={classes.root}>
        <Typography className={classes.header} variant="h6">Add new receiver</Typography>
        <Typography className={classes.body} variant="body1">Enter a name to add a new receiver to your gift list</Typography>
        <form
          onChange={(event) => this.onFormChange(event)}
          onSubmit={(event) => this.onFormSubmit(event)}
          className={classes.form}
          noValidate autoComplete="off" >

          <TextField
            required={true}
            id="name"
            label="Name"
            className={classes.textField}
            value={name}
            onChange={this.onFormChange('name')}
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.submitButton}
          >Add Receiver</Button>
        </form>
      </div>
    )
  }
}

const loadingSelector = createLoadingSelector(['ADD_RECEIVER'])

ReceiverAdd.propTypes = {
  currentListId: PropTypes.number,
  addReceiver: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    currentListId: state.list.currentId,
    isLoading: loadingSelector(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addReceiver: (receiver, listId) => {
      dispatch(addReceiver(receiver, listId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ReceiverAdd))
