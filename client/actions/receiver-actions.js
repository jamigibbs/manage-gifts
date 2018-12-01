import axios from 'axios'
import {
  ADD_RECEIVER_SUCCESS,
  ADD_RECEIVER_REQUEST,
  GET_ALL_LIST_RECEIVERS,
  REMOVE_RECEIVER_FROM_LIST_SUCCESS,
  REMOVE_RECEIVER_FROM_LIST_REQUEST,
  REMOVE_ALL_LIST_RECEIVERS,
  GET_ALL_RECEIVER_GIFTS,
  ADD_GIFT_TO_RECEIVER_SUCCESS,
  ADD_GIFT_TO_RECEIVER_REQUEST,
  GET_RECEIVER_NAME,
  REMOVE_GIFT_FROM_RECEIVER_SUCCESS,
  REMOVE_GIFT_FROM_RECEIVER_REQUEST,
  TOGGLE_GIFT_STATUS } from '../constants'

const addedReceiverSuccess = (receiver) => ({type: ADD_RECEIVER_SUCCESS, receiver})
const addedReceiverRequest = (receiver) => ({type: ADD_RECEIVER_REQUEST, receiver})
const gotAllListReceivers = (receivers) => ({type: GET_ALL_LIST_RECEIVERS, receivers})
export const removedAllListReceivers = () => ({type: REMOVE_ALL_LIST_RECEIVERS})
const gotAllReceiverGifts = (gifts) => ({type: GET_ALL_RECEIVER_GIFTS, gifts})
const addedGiftToReceiverSuccess = (gift) => ({type: ADD_GIFT_TO_RECEIVER_SUCCESS, gift})
const addedGiftToReceiverRequest = () => ({type: ADD_GIFT_TO_RECEIVER_REQUEST})
const gotReceiver = (receiver) => ({type: GET_RECEIVER_NAME, receiver})
const removedGiftFromReceiverSuccess = (id) => ({type: REMOVE_GIFT_FROM_RECEIVER_SUCCESS, id})
const removedGiftFromReceiverRequest = () => ({type: REMOVE_GIFT_FROM_RECEIVER_REQUEST})
const toggledGiftStatus = (gift) => ({type: TOGGLE_GIFT_STATUS, gift})
const removedReceiverFromListRequest = () => ({type: REMOVE_RECEIVER_FROM_LIST_REQUEST})
const removedReceiverFromListSuccess = (receiver) => {
  return {
    type: REMOVE_RECEIVER_FROM_LIST_SUCCESS,
    receiver
  }
}

export const addReceiver = (name, listId) => async dispatch => {
  try {
    dispatch(addedReceiverRequest(data))
    const { data } = await axios.post('/api/receiver', {name, listId})
    dispatch(addedReceiverSuccess(data))
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
    dispatch(removedReceiverFromListRequest())
    const { data } = await axios.delete('/api/receiver', {
      data: {
        listId,
        receiverId
      }
    })
    dispatch(removedReceiverFromListSuccess(data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllReceiverGifts = (receiverId) => async dispatch => {
  try {
    const { data } = await axios.get('/api/receiver/gifts', {
      params: {
        receiverId
      }
    })
    dispatch(gotAllReceiverGifts(data))
  } catch(err) {
    console.error(err)
  }
}

export const addGiftToReceiver = (url, receiverId) => async dispatch => {
  try {
    dispatch(addedGiftToReceiverRequest())
    const { data } = await axios.post('/api/gift/add', {url, receiverId})
    dispatch(addedGiftToReceiverSuccess(data))
  } catch (err) {
    console.error(err)
  }
}

export const getReceiver = (receiverId) => async dispatch => {
  try {
    const { data } = await axios.get('/api/receiver', {
      params: {
        receiverId
      }
    })
    dispatch(gotReceiver(data))
  } catch(err) {
    console.error(err)
  }
}

export const removeGiftFromReceiver = (id) => async dispatch => {
  try {
    dispatch(removedGiftFromReceiverRequest(id))
    const { data } = await axios.delete('/api/receiver/gift', {
      data: { id }
    })
    dispatch(removedGiftFromReceiverSuccess(id))
  } catch (err) {
    console.error(err)
  }
}

export const toggleGiftStatus = (gift) => async dispatch => {
  try {
    const { data } = await axios.post('/api/receiver/gift/status', { gift })
    dispatch(toggledGiftStatus(data))
  } catch (err) {
    console.error(err)
  }
}
