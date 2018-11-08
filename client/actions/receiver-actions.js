import axios from 'axios'
import { ADD_RECEIVER, GET_ALL_LIST_RECEIVERS } from '../constants'

/**
 * ACTION CREATORS
 */
const addedReceiver = (receiver) => ({type: ADD_RECEIVER, receiver})
const gotAllListReceivers = (receivers) => ({type: GET_ALL_LIST_RECEIVERS, receivers})

/**
 * THUNK CREATORS
 */
export const addReceiver = (receiver, auth) => async dispatch => {
  try {
    const { data } = await axios.post('/api/receiver', {receiver, auth})
    dispatch(addedReceiver(data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllListReceivers = (listId, auth) => async dispatch => {
  try {
    const { data } = await axios.get('/api/receiver/all', {
      params: {
        listId,
        auth
      }
    })
    dispatch(gotAllListReceivers(data))
  } catch (err) {
    console.error(err)
  }
}
