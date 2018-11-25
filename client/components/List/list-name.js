import React from 'react'
import PropTypes from 'prop-types'

const ListName = ({userLists, listId}) => {

  const getListName = (id) => {
    const list = userLists
      .find( list => list.id === id )
    return list.name
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
