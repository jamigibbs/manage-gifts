import { GET_CURRENT_LIST_ID, UPDATE_CURRENT_LIST_ID, GET_LISTS_FOR_USER } from '../constants'

const list = {
  currentId: 0,
  userLists: []
}

export default function(state = list, action) {
  switch (action.type) {
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
