import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { updateCurrentListId, getListsForuser } from '../../actions'
import ListSelectDialog from './list-select-dialog'
import { withStyles } from '@material-ui/core/styles'
import { ListItemText } from '@material-ui/core'

const styles = theme => ({
  listItem: {
    flex: '1 1 auto',
    padding: '0 16px',
    minWidth: 0,
  }
})

class ListSelect extends Component {
  state = {
    open: false,
    selectedList: 'None',
    listId: null
  }

  componentDidMount = () => {
    const userId = this.props.userId ? this.props.userId : Cookies.get('mg_id')
    this.props.getListsForuser(userId)
  }

  handleClickOpen = () => {
    this.props.getListsForuser(this.props.userId)
    this.setState({
      open: true
    })
  }

  handleClose = (name, id) => {
    this.setState({ selectedList: name, listId: id, open: false })
    this.props.updateCurrentListId(id)
  }

  render() {
    const { userLists, classes } = this.props
    return (
      <div>
        <div className={classes.listItem}>
          <ListItemText
            primary="Select List"
            onClick={this.handleClickOpen}
          />
        </div>
        <ListSelectDialog
          selectedList={this.state.selectedList}
          open={this.state.open}
          onClose={this.handleClose}
          lists={userLists}
        />
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

ListSelectDialog.propTypes = {
  userLists: PropTypes.array,
  userId: PropTypes.number,
  updateCurrentListId: PropTypes.func,
  getListsForuser: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListSelect))
