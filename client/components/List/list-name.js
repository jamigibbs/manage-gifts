import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { TextField } from '@material-ui/core'
import { updateCurrentListName } from '../../actions'
import { createLoadingSelector } from '../../utilities'
import EditIcon from '@material-ui/icons/Edit'

class ListName extends React.Component {

  state = {
    editing: false,
    name: ''
  }

  componentDidMount = () => {
    const listId = this.props.listId
    this.setState({name: this.getListName(listId)})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listId !== nextProps.listId) {
      const listId = nextProps.listId
      this.setState({name: this.getListName(listId)})
    }
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
      this.props.updateCurrentListName(this.state.name, this.props.listId)
      this.setState({editing: false})
    }
  }

  handleChange = (event) => {
    this.setState({name: event.target.value})
  }

  renderEdit = () => {
    return <TextField
      style={{ width: 300, fontWeight: '500' }}
      autoFocus
      id="title-edit"
      helperText="Press enter to save"
      value={ this.state.name }
      onChange={this.handleChange}
      onKeyPress={this.handleKeyPress} />
  }

  renderDefault = () => {
    return (
      <div>
        <span onClick={this.handleClick}>
          { this.state.name }<EditIcon color="disabled" style={{ fontSize: 20, marginLeft: 10 }} />
        </span>
      </div>
    )
  }

  render(){
    return (
      <div>
        { this.state.editing ? this.renderEdit() : this.renderDefault() }
      </div>
    )
  }
}

const loadingSelector = createLoadingSelector(['UPDATE_CURRENT_LIST_NAME'])

ListName.propTypes = {
  userLists: PropTypes.arrayOf(PropTypes.object),
  listId: PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    currentListName: state.list.currentListName,
    isLoading: loadingSelector(state)
  }
}

const mapDispatchTopProps = (dispatch) => {
  return {
    updateCurrentListName: (name, listId) => {
      dispatch(updateCurrentListName(name, listId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchTopProps)(ListName)
