import { GET_CURRENT_LIST_ID, UPDATE_CURRENT_LIST_ID } from '../constants'

/**
 * ACTION CREATORS
 */
export const getCurrentListId = () => ({type: GET_CURRENT_LIST_ID})

export const updatedCurrentListId = (id) => ({type: UPDATE_CURRENT_LIST_ID, id})

export const updateCurrentListId = (id) => dispatch => {
  try {
    dispatch(updatedCurrentListId(id))
  } catch (err) {
    console.error(err)
  }
}
