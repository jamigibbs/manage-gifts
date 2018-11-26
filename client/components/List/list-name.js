import React from 'react'
import PropTypes from 'prop-types'

const ListName = ({userLists, listId}) => {

  const getListName = (id) => {
    return userLists
      .find( list => list.id === id )
      .name
  }

  return (
    <span>{ getListName(listId) }</span>
  )
}

ListName.propTypes = {
  userLists: PropTypes.arrayOf(PropTypes.object),
  listId: PropTypes.number
}

export default ListName
