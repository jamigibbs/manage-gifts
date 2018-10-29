import { ADD_RECEIVER } from '../constants'

const receivers = {
  all: []
}

export default function(state = receivers, action) {
  switch (action.type) {
    case ADD_RECEIVER:
      return {...state, all: [...state.all, action.receiver]}
    default:
      return state
  }
}
