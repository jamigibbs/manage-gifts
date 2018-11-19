import React from 'react'

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

export default ListName
