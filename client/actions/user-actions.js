import axios from 'axios'
import history from '../history'
import { GET_USER_REQUEST, GET_USER_SUCCESS, REMOVE_USER} from '../constants'

const getUserSuccess = user => ({type: GET_USER_SUCCESS, user})
const getUserRequest = () => ({type: GET_USER_REQUEST})
const removeUser = () => ({type: REMOVE_USER})

export const me = () => async dispatch => {
  try {
    dispatch(getUserRequest())
    const res = await axios.get('/auth/me')
    dispatch(getUserSuccess(res.data || {} ))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, firstName, lastName) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password, firstName, lastName})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/dashboard')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}
