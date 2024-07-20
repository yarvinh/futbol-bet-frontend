import axios from 'axios'
import { userLoading, userReceived} from '../state/userReducer'
import { errorsOrMsgsRecieved } from '../state/errorsOrMsgs'
import { SERVER_ERROR } from './errorsConst'
import { token } from '../helpers/token'

export const fetchEditUser = (user) => {
  return async (dispatch) => {
    dispatch(userLoading())
    try {
       const response = await axios.patch(`http://localhost:3000/users/${user.user_id}`, {user}, {headers: token(),withCredentials: true})
      dispatch(userReceived(response.data))
    } catch (error) {
      dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
    }
  }
  
}