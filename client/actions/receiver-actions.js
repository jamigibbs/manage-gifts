import axios from 'axios'
import {
  ADD_RECEIVER,
  GET_ALL_LIST_RECEIVERS,
  REMOVE_RECEIVER_FROM_LIST,
  REMOVE_ALL_LIST_RECEIVERS,
  GET_ALL_RECEIVER_GIFTS } from '../constants'

const addedReceiver = (receiver) => ({type: ADD_RECEIVER, receiver})
const gotAllListReceivers = (receivers) => ({type: GET_ALL_LIST_RECEIVERS, receivers})
export const removedAllListReceivers = () => ({type: REMOVE_ALL_LIST_RECEIVERS})
const gotAllReceiverGifts = (gifts) => {{type: GET_ALL_RECEIVER_GIFTS, gifts}}

const removedReceiverFromList = (receiver) => {
  return {
    type: REMOVE_RECEIVER_FROM_LIST,
    receiver
  }
}

export const addReceiver = (name, listId) => async dispatch => {
  try {
    const { data } = await axios.post('/api/receiver', {name, listId})
    dispatch(addedReceiver(data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllListReceivers = (listId) => async dispatch => {
  try {
    const { data } = await axios.get('/api/receiver/all', {
      params: {
        listId
      }
    })
    dispatch(gotAllListReceivers(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeReceiverFromList = (listId, receiverId) => async dispatch => {
  try {
    const { data } = await axios.delete('/api/receiver', {
      data: {
        listId,
        receiverId
      }
    })
    dispatch(removedReceiverFromList(data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllReceiverGifts = (receiverId) => async dispatch => {
  try {
    const gifts = generateDemoGifts(5)

    dispatch(gotAllReceiverGifts(gifts))
  } catch(err) {
    console.error(err)
  }
}
