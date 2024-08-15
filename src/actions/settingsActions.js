import axios from 'axios'
import { userLoading, userReceived} from '../state/userReducer'
import { errorsOrMsgsRecieved } from '../state/errorsOrMsgs'
import { token } from '../helpers/token'
import { serverErrors } from '../helpers/errorHelpers'
import { baseUrl } from '../helpers/urlAndPaths'

export const fetchEditUser = (user) => {
  return async (dispatch) => {
    dispatch(userLoading())
    try {
       const response = await axios.patch(`${baseUrl()}/users/${user.user_id}`, {user}, {headers: token(),withCredentials: true})
      dispatch(userReceived(response.data))
    } catch (error) {
      dispatch(userLoading())
      dispatch(errorsOrMsgsRecieved(serverErrors(error)))
    }
  }
  
}