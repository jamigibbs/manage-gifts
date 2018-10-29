import { ADD_RECEIVER, GET_ALL_RECEIVERS } from '../constants'

const receivers = {
  all: []
}

export default function(state = receivers, action) {
  switch (action.type) {
    case ADD_RECEIVER:
      return {...state, all: [...state.all, action.receiver]}
    case GET_ALL_RECEIVERS:
      return {...state, all: action.receivers}
    default:
      return state
  }
}
