import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { createLoadingSelector } from '../../utilities'
import { updateCurrentListId, getListsForuser } from '../../actions'
import ListSelectDialog from './list-select-dialog'
import { withStyles } from '@material-ui/core/styles'
import { ListItemText } from '@material-ui/core'

const styles = theme => ({
  listItem: {
    flex: '1 1 auto',
    padding: '0 16px',
    minWidth: 0,
  },
  listItemText: {
    color: '#C2C6CB'
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
            classes={{ primary: classes.listItemText }}
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

const loadingSelector = createLoadingSelector(['UPDATE_CURRENT_LIST_ID, GET_LISTS_FOR_USER'])

const mapStateToProps = (state) => {
  return {
    userLists: state.list.userLists,
    userId: state.user.id,
    isLoading: loadingSelector(state)
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
