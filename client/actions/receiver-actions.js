import axios from 'axios'
import {
  ADD_RECEIVER_SUCCESS,
  ADD_RECEIVER_REQUEST,
  GET_ALL_LIST_RECEIVERS,
  REMOVE_RECEIVER_FROM_LIST_SUCCESS,
  REMOVE_RECEIVER_FROM_LIST_REQUEST,
  REMOVE_ALL_LIST_RECEIVERS,
  GET_ALL_RECEIVER_GIFTS_SUCCESS,
  GET_ALL_RECEIVER_GIFTS_REQUEST,
  ADD_GIFT_TO_RECEIVER_SUCCESS,
  ADD_GIFT_TO_RECEIVER_REQUEST,
  GET_RECEIVER_NAME_SUCCESS,
  GET_RECEIVER_NAME_REQUEST,
  REMOVE_GIFT_FROM_RECEIVER_SUCCESS,
  REMOVE_GIFT_FROM_RECEIVER_REQUEST,
  TOGGLE_GIFT_STATUS_SUCCESS,
  TOGGLE_GIFT_STATUS_REQUEST } from '../constants'

const addedReceiverSuccess = (receiver) => ({type: ADD_RECEIVER_SUCCESS, receiver})
const addedReceiverRequest = () => ({type: ADD_RECEIVER_REQUEST})

const gotAllListReceivers = (receivers) => ({type: GET_ALL_LIST_RECEIVERS, receivers})

export const removedAllListReceivers = () => ({type: REMOVE_ALL_LIST_RECEIVERS})

const gotAllReceiverGiftsSuccess = (gifts) => ({type: GET_ALL_RECEIVER_GIFTS_SUCCESS, gifts})
const gotAllReceiverGiftsRequest = () => ({type: GET_ALL_RECEIVER_GIFTS_REQUEST})

const addedGiftToReceiverSuccess = (gift) => ({type: ADD_GIFT_TO_RECEIVER_SUCCESS, gift})
const addedGiftToReceiverRequest = () => ({type: ADD_GIFT_TO_RECEIVER_REQUEST})

const gotReceiverSuccess = (receiver) => ({type: GET_RECEIVER_NAME_SUCCESS, receiver})
const gotReceiverRequest = () => ({type: GET_RECEIVER_NAME_REQUEST})

const removedGiftFromReceiverSuccess = (id) => ({type: REMOVE_GIFT_FROM_RECEIVER_SUCCESS, id})
const removedGiftFromReceiverRequest = () => ({type: REMOVE_GIFT_FROM_RECEIVER_REQUEST})

const toggledGiftStatusSuccess = (gift) => ({type: TOGGLE_GIFT_STATUS_SUCCESS, gift})
const toggledGiftStatusRequest = () => ({type: TOGGLE_GIFT_STATUS_REQUEST})

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
    dispatch(gotAllReceiverGiftsRequest(data))
    const { data } = await axios.get('/api/receiver/gifts', {
      params: {
        receiverId
      }
    })
    dispatch(gotAllReceiverGiftsSuccess(data))
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
    dispatch(gotReceiverRequest())
    const { data } = await axios.get('/api/receiver', {
      params: {
        receiverId
      }
    })
    dispatch(gotReceiverSuccess(data))
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
    dispatch(toggledGiftStatusRequest())
    const { data } = await axios.post('/api/receiver/gift/status', { gift })
    dispatch(toggledGiftStatusSuccess(data))
  } catch (err) {
    console.error(err)
  }
}
