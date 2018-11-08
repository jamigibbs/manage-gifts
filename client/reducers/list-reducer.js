import { GET_CURRENT_LIST_ID, UPDATE_CURRENT_LIST_ID } from '../constants'

const list = {
  currentId: 1
}

export default function(state = list, action) {
  switch (action.type) {
    case UPDATE_CURRENT_LIST_ID:
      return {...state, currentId: action.id}
    case GET_CURRENT_LIST_ID:
      return state
    default:
      return state
  }
}
