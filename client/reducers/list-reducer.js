import { GET_CURRENT_LIST_ID } from '../constants'

const list = {
  currentId: null
}

export default function(state = list, action) {
  switch (action.type) {
    case GET_CURRENT_LIST_ID:
      return {...state}
    default:
      return state
  }
}
