import {
  GET_CURRENT_LIST_ID,
  UPDATE_CURRENT_LIST_ID,
  GET_LISTS_FOR_USER,
  ADD_NEW_LIST,
  DELETE_LIST,
  UPDATE_PREVIOUS_LIST_ID } from '../constants'

const list = {
  currentId: null,
  prevId: null,
  userLists: []
}

export default function(state = list, action) {
  switch (action.type) {
    case ADD_NEW_LIST:
      return {...state, currentId: action.newList.id, userLists: [...state.userLists, action.newList]}
    case DELETE_LIST:
      return {...state, currentId: 0, userLists: state.userLists.filter((list) => {
        return list.id !== action.list.listId
      })}
    case UPDATE_CURRENT_LIST_ID:
      return {...state, currentId: action.id}
    case UPDATE_PREVIOUS_LIST_ID:
      return {...state, prevId: action.id}
    case GET_CURRENT_LIST_ID:
      return state
    case GET_LISTS_FOR_USER:
      return {...state, userLists: action.userLists}
    default:
      return state
  }
}
