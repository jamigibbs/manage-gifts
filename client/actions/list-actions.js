import axios from 'axios'
import { GET_CURRENT_LIST_ID, UPDATE_CURRENT_LIST_ID, GET_LISTS_FOR_USER } from '../constants'

/**
 * ACTION CREATORS
 */
export const getCurrentListId = () => ({type: GET_CURRENT_LIST_ID})

export const updatedCurrentListId = (id) => ({type: UPDATE_CURRENT_LIST_ID, id})

export const gotListsForUser = (userLists) => ({type: GET_LISTS_FOR_USER, userLists})

export const updateCurrentListId = (id) => dispatch => {
  try {
    dispatch(updatedCurrentListId(id))
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
