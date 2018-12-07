import axios from 'axios'
import history from '../history'
import { strToLowercaseDashed } from '../utilities'
import {
  GET_CURRENT_LIST_ID,
  UPDATE_CURRENT_LIST_ID_REQUEST,
  UPDATE_CURRENT_LIST_ID_SUCCESS,
  GET_LISTS_FOR_USER_REQUEST,
  GET_LISTS_FOR_USER_SUCCESS,
  ADD_NEW_LIST_SUCCESS,
  ADD_NEW_LIST_REQUEST,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  UPDATE_PREVIOUS_LIST_ID_REQUEST,
  UPDATE_PREVIOUS_LIST_ID_SUCCESS,
  GET_ALL_GIFTS_FOR_LIST_SUCCESS,
  GET_ALL_GIFTS_FOR_LIST_REQUEST,
  UPDATE_CURRENT_LIST_NAME_REQUEST,
  UPDATE_CURRENT_LIST_NAME_SUCCESS } from '../constants'

import { removedAllListReceivers } from './receiver-actions'

export const getCurrentListId = () => ({type: GET_CURRENT_LIST_ID})
export const updatedCurrentListNameRequest = (name) => ({type: UPDATE_CURRENT_LIST_NAME_REQUEST, name})
export const updatedCurrentListNameSuccess = (name) => ({type: UPDATE_CURRENT_LIST_NAME_SUCCESS, name})

export const updatedCurrentListIdSuccess = (id) => ({type: UPDATE_CURRENT_LIST_ID_SUCCESS, id})
export const updatedCurrentListIdRequest = () => ({type: UPDATE_CURRENT_LIST_ID_REQUEST})

export const updatedPreviousListIdSuccess = (id) => ({type: UPDATE_PREVIOUS_LIST_ID_SUCCESS, id})
export const updatedPreviousListIdRequest = () => ({type: UPDATE_PREVIOUS_LIST_ID_REQUEST})

export const gotListsForUserSuccess = (userLists) => ({type: GET_LISTS_FOR_USER_SUCCESS, userLists})
export const gotListsForUserRequest = () => ({type: GET_LISTS_FOR_USER_REQUEST})

export const addedNewListSuccess = (newList) => ({type: ADD_NEW_LIST_SUCCESS, newList})
export const addedNewListRequest = () => ({type: ADD_NEW_LIST_REQUEST})

export const deletedListSuccess = (list) => ({type: DELETE_LIST_SUCCESS, list})
export const deletedListRequest = () => ({type: DELETE_LIST_REQUEST})

export const gotAllGiftsForListSuccess = (gifts) => ({type: GET_ALL_GIFTS_FOR_LIST_SUCCESS, gifts})
export const gotAllGiftsForListRequest = () => ({type: GET_ALL_GIFTS_FOR_LIST_REQUEST})

export const updateCurrentListId = (id) => dispatch => {
  try {
    dispatch(updatedCurrentListIdRequest())
    dispatch(updatedCurrentListIdSuccess(id))
  } catch (err) {
    console.error(err)
  }
}

export const updateCurrentListName = (name, listId) => async dispatch => {
  try {
    dispatch(updatedCurrentListNameRequest())
    const { data } = await axios.post('/api/list/name', { name, listId })
    dispatch(updatedCurrentListNameSuccess(data))
  } catch (err) {
    console.error(err)
  }
}

export const updatePreviousListId = (id) => dispatch => {
  try {
    dispatch(updatedPreviousListIdRequest())
    dispatch(updatedPreviousListIdSuccess(id))
  } catch (err) {
    console.error(err)
  }
}

export const getListsForuser = (userId) => async dispatch => {
  try {
    dispatch(gotListsForUserRequest(data))
    const { data } = await axios.get('/api/list/all', {
      params: {
        userId
      }
    })
    dispatch(gotListsForUserSuccess(data))
  } catch (err) {
    console.error(err)
  }
}

export const addNewList = (name, userId) => async dispatch => {
  try {
    dispatch(addedNewListRequest())
    const { data } = await axios.post('/api/list/add', { name, userId })
    dispatch(addedNewListSuccess(data))
    history.push(`/dashboard/list/${strToLowercaseDashed(data.name)}/${data.id}`)
  } catch (err) {
    console.error(err)
  }
}

export const deleteList = (listId, userId) => async dispatch => {
  try {
    dispatch(deletedListRequest())
    const { data } = await axios.delete('/api/list', { data: {listId, userId} })
    dispatch(removedAllListReceivers())
    dispatch(deletedListSuccess(data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllGiftsForList = (receiverIds) => async dispatch => {
  try {
    dispatch(gotAllGiftsForListRequest())
    const { data } = await axios.get('/api/list/gifts', {
      params: {
        receiverIds: JSON.stringify(receiverIds)
      }
    })
    dispatch(gotAllGiftsForListSuccess(data))
  } catch (err) {
    console.error(err)
  }
}
