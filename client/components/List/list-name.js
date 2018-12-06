import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import EditIcon from '@material-ui/icons/edit'

class ListName extends React.Component {

  state = {
    editing: false,
    text: ''
  }

  componentDidMount = () => {
    const listId = this.props.listId
    this.setState({text: this.getListName(listId)})
  }

  getListName = (id) => {
    return this.props.userLists
      .find( list => list.id === id )
      .name
  }

  handleClick = () => {
    this.setState({editing: true})
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.setState({editing: false})
    }
  }

  handleChange = (event) => {
    this.setState({text: event.target.value})
  }

  renderEdit = () => {
    return <TextField
      autoFocus
      id="title-edit"
      helperText="Press enter to save"
      value={ this.state.text }
      onChange={this.handleChange}
      onKeyPress={this.handleKeyPress} />
  }

  renderDefault = () => {
    return <div><span onClick={this.handleClick}>{ this.state.text }<EditIcon color="disabled" style={{ fontSize: 20, marginLeft: 10 }} /></span></div>
  }

  render(){
    return (
      <div>
        { this.state.editing ? this.renderEdit() : this.renderDefault() }
      </div>
    )
  }
}

ListName.propTypes = {
  userLists: PropTypes.arrayOf(PropTypes.object),
  listId: PropTypes.number
}

export default ListName
