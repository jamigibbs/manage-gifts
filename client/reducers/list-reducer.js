import {
  GET_CURRENT_LIST_ID,
  UPDATE_CURRENT_LIST_ID_SUCCESS,
  GET_LISTS_FOR_USER,
  ADD_NEW_LIST,
  DELETE_LIST,
  UPDATE_PREVIOUS_LIST_ID,
  GET_ALL_GIFTS_FOR_LIST } from '../constants'

const list = {
  currentId: null,
  prevId: null,
  userLists: [],
  gifts: []
}

export default function(state = list, action) {
  switch (action.type) {
    case ADD_NEW_LIST:
      return {...state, currentId: action.newList.id, userLists: [...state.userLists, action.newList]}
    case DELETE_LIST:
      return {...state, currentId: null, userLists: state.userLists.filter((list) => {
        return list.id !== action.list.listId
      })}
    case UPDATE_CURRENT_LIST_ID_SUCCESS:
      return {...state, currentId: action.id}
    case UPDATE_PREVIOUS_LIST_ID:
      return {...state, prevId: action.id}
    case GET_CURRENT_LIST_ID:
      return state
    case GET_LISTS_FOR_USER:
      return {...state, userLists: action.userLists}
    case GET_ALL_GIFTS_FOR_LIST:
      return {...state, gifts: action.gifts}
    default:
      return state
  }
}
