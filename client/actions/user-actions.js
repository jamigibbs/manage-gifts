import axios from 'axios'
import history from '../history'
import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS} from '../constants'

const getUserSuccess = user => ({type: GET_USER_SUCCESS, user})
const getUserRequest = () => ({type: GET_USER_REQUEST})
const logoutUserRequest = () => ({type: LOGOUT_USER_REQUEST})
const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS})

export const me = () => async dispatch => {
  try {
    dispatch(getUserRequest())
    const res = await axios.get('/auth/me')
    dispatch(getUserSuccess(res.data || {} ))
  } catch (err) {
    console.error(err)
  }
}

export const logout = () => async dispatch => {
  try {
    dispatch(logoutUserRequest())
    await axios.post('/auth/logout')
    dispatch(logoutUserSuccess())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}
