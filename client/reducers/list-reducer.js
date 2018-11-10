import { GET_CURRENT_LIST_ID, UPDATE_CURRENT_LIST_ID, GET_LISTS_FOR_USER, ADD_NEW_LIST } from '../constants'

const list = {
  currentId: 0,
  userLists: []
}

export default function(state = list, action) {
  switch (action.type) {
    case ADD_NEW_LIST:
      return {...state, currentId: action.newList.id, userLists: [...state.userLists, action.newList]}
    case UPDATE_CURRENT_LIST_ID:
      return {...state, currentId: action.id}
    case GET_CURRENT_LIST_ID:
      return state
    case GET_LISTS_FOR_USER:
      return {...state, userLists: action.userLists}
    default:
      return state
  }
}
