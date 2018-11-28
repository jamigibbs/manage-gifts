import { GET_USER_SUCCESS, REMOVE_USER} from '../constants'

const defaultUser = {}

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
