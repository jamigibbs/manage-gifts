import axios from 'axios'
import { ADD_RECEIVER } from '../constants'

/**
 * ACTION CREATORS
 */
const addedReceiver = (receiver) => ({type: ADD_RECEIVER, receiver})

/**
 * THUNK CREATORS
 */
export const addReceiver = (receiver, auth) => async dispatch => {
  try {
    const {data} = await axios.post('/api/receiver', {receiver, auth})
    dispatch(addedReceiver(data))
  } catch (err) {
    console.error(err)
  }
}
