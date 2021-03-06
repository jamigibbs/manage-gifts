import {
  GET_CURRENT_LIST_ID,
  UPDATE_CURRENT_LIST_ID_SUCCESS,
  GET_LISTS_FOR_USER_SUCCESS,
  ADD_NEW_LIST_SUCCESS,
  DELETE_LIST_SUCCESS,
  UPDATE_PREVIOUS_LIST_ID_SUCCESS,
  GET_ALL_GIFTS_FOR_LIST_SUCCESS,
  UPDATE_CURRENT_LIST_NAME_SUCCESS } from '../constants'

const list = {
  currentId: null,
  prevId: null,
  currentListName: '',
  userLists: [],
  gifts: [],
}

export default function(state = list, action) {
  switch (action.type) {
    case ADD_NEW_LIST_SUCCESS:
      return {...state, currentId: action.newList.id, userLists: [...state.userLists, action.newList]}
    case DELETE_LIST_SUCCESS:
      return {...state, currentId: null, userLists: state.userLists.filter((list) => {
        return list.id !== action.list.listId
      })}
    case UPDATE_CURRENT_LIST_ID_SUCCESS:
      return {...state, currentId: action.id}
    case UPDATE_PREVIOUS_LIST_ID_SUCCESS:
      return {...state, prevId: action.id}
    case GET_CURRENT_LIST_ID:
      return state
    case GET_LISTS_FOR_USER_SUCCESS:
      return {...state, userLists: action.userLists}
    case GET_ALL_GIFTS_FOR_LIST_SUCCESS:
      return {...state, gifts: action.gifts}
    case UPDATE_CURRENT_LIST_NAME_SUCCESS:
      return {...state,  currenListName: action.name }
    default:
      return state
  }
}
