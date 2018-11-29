import { GET_USER_SUCCESS, LOGOUT_USER_SUCCESS} from '../constants'

const defaultUser = {}

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return action.user
    case LOGOUT_USER_SUCCESS:
      return defaultUser
    default:
      return state
  }
}
