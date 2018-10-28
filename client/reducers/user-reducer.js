import { GET_USER, REMOVE_USER} from '../constants'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
