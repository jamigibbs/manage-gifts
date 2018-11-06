import { GET_CURRENT_LIST_ID } from '../constants'

const list = {
  currentId: 1
}

export default function(state = list, action) {
  switch (action.type) {
    case GET_CURRENT_LIST_ID:
      return list.currentId
    default:
      return state
  }
}
