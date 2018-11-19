import {
  ADD_RECEIVER,
  GET_ALL_LIST_RECEIVERS,
  REMOVE_RECEIVER_FROM_LIST,
  REMOVE_ALL_LIST_RECEIVERS,
  GET_ALL_RECEIVER_GIFTS,
  ADD_GIFT_TO_RECEIVER,
  GET_RECEIVER_NAME } from '../constants'

const receivers = {
  allFromList: [],
  gifts: [],
  currentReceiver: {}
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
    case GET_ALL_RECEIVER_GIFTS:
      return {...state, gifts: action.gifts}
    case ADD_GIFT_TO_RECEIVER:
      return {...state, gifts: [...state.gifts, action.gift]}
    case GET_RECEIVER_NAME:
      return {...state, currentReceiver: action.receiver}
    default:
      return state
  }
}
