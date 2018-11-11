import {
  ADD_RECEIVER,
  GET_ALL_LIST_RECEIVERS,
  REMOVE_RECEIVER_FROM_LIST,
  REMOVE_ALL_LIST_RECEIVERS } from '../constants'

const receivers = {
  allFromList: []
}

export default function(state = receivers, action) {
  switch (action.type) {
    case ADD_RECEIVER:
      return {...state, allFromList: [...state.allFromList, action.receiver]}
    case REMOVE_RECEIVER_FROM_LIST:
      return {...state, allFromList: state.allFromList.filter((receiver) => {
        return receiver.id !== action.receiver.receiverId
      })}
    case REMOVE_ALL_LIST_RECEIVERS:
      return {...state, allFromList: [] }
    case GET_ALL_LIST_RECEIVERS:
      return {...state, allFromList: action.receivers}
    default:
      return state
  }
}
