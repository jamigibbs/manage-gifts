import { ADD_RECEIVER, GET_ALL_LIST_RECEIVERS } from '../constants'

const receivers = {
  allFromList: []
}

export default function(state = receivers, action) {
  switch (action.type) {
    case ADD_RECEIVER:
      return {...state, allFromList: [...state.allFromList, action.receiver]}
    case GET_ALL_LIST_RECEIVERS:
      return {...state, allFromList: action.receivers}
    default:
      return state
  }
}
