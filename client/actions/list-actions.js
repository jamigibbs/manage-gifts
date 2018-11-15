import axios from 'axios'
import history from '../history'
import { strToLowercaseDashed } from '../utilities'
import {
  GET_CURRENT_LIST_ID,
  UPDATE_CURRENT_LIST_ID,
  GET_LISTS_FOR_USER,
  ADD_NEW_LIST,
  DELETE_LIST,
  UPDATE_PREVIOUS_LIST_ID } from '../constants'

import { removedAllListReceivers } from './receiver-actions'

export const getCurrentListId = () => ({type: GET_CURRENT_LIST_ID})
export const updatedCurrentListId = (id) => ({type: UPDATE_CURRENT_LIST_ID, id})
export const updatedPreviousListId = (id) => ({type: UPDATE_PREVIOUS_LIST_ID, id})
export const gotListsForUser = (userLists) => ({type: GET_LISTS_FOR_USER, userLists})
export const addedNewList = (newList) => ({type: ADD_NEW_LIST, newList})
export const deletedList = (list) => ({type: DELETE_LIST, list})

export const updateCurrentListId = (id) => dispatch => {
  try {
    dispatch(updatedCurrentListId(id))
  } catch (err) {
    console.error(err)
  }
}

export const updatePreviousListId = (id) => dispatch => {
  try {
    dispatch(updatedPreviousListId(id))
  } catch (err) {
    console.error(err)
  }
}

export const getListsForuser = (userId) => async dispatch => {
  try {
    const { data } = await axios.get('/api/list/all', {
      params: {
        userId
      }
    })
    dispatch(gotListsForUser(data))
  } catch (err) {
    console.error(err)
  }
}

export const addNewList = (name, userId) => async dispatch => {
  try {
    const { data } = await axios.post('/api/list/add', { name, userId })
    dispatch(addedNewList(data))
    history.push(`/dashboard/list/${strToLowercaseDashed(data.name)}/${data.id}`)
  } catch (err) {
    console.error(err)
  }
}

export const deleteList = (listId, userId) => async dispatch => {
  try {
    const { data } = await axios.delete('/api/list', { data: {listId, userId} })
    dispatch(removedAllListReceivers())
    dispatch(deletedList(data))
  } catch (err) {
    console.error(err)
  }
}
