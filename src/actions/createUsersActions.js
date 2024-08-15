import axios from 'axios'
import { errorsOrMsgsRecieved } from '../state/errorsOrMsgs'
import { userReceived } from '../state/userReducer'
import { serverErrors } from '../helpers/errorHelpers'
import { baseUrl } from '../helpers/urlAndPaths'

export const createUser = (user) => {
    return async (dispatch) => {
        dispatch({ type: 'LOADING_NEW_USER'})
        try {
          const response = await axios.post(`${baseUrl()}/users`, user, {withCredentials: true})
          if(response.data.token){
            localStorage.setItem("token", response.data.token);
          }
          const errorsOrMsg = response.data.errors_or_messages
          errorsOrMsg ? dispatch(errorsOrMsgsRecieved(errorsOrMsg)) : dispatch(userReceived(response.data))
        } catch (error) {
          dispatch(errorsOrMsgsRecieved(serverErrors(error)))
        }
    }
  }
