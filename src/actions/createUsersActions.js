import axios from 'axios'
import { errorsOrMsgsRecieved } from '../state/errorsOrMsgs'
import { userReceived } from '../state/userReducer'
import { SERVER_ERROR } from './errorsConst'

export const createUser = (user) => {
    return async (dispatch) => {
        dispatch({ type: 'LOADING_NEW_USER'})
        try {
          const response = await axios.post('http://localhost:3000/users', user, {withCredentials: true})
          const errorsOrMsg = response.data.errors_or_messages
          errorsOrMsg ? dispatch(errorsOrMsgsRecieved(errorsOrMsg)) : dispatch(userReceived(response.data))
        } catch (error) {
          dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
        }
    }
  }
