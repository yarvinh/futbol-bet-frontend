import axios from 'axios'
import { errorsOrMsgsRecieved } from '../state/errorsOrMsgs'
import { userReceived } from '../state/userReducer'
import { SERVER_ERROR } from './errorsConst'

export const createUser = (user) => {
    return async (dispatch) => {
        dispatch({ type: 'LOADING_NEW_USER'})
        try {
          const response = await axios.post('http://localhost:3000/users', user, {withCredentials: true})
          if(response.data.token){
            localStorage.setItem("token", response.data.token);
          }
          const errorsOrMsg = response.data.errors_or_messages
          errorsOrMsg ? dispatch(errorsOrMsgsRecieved(errorsOrMsg)) : dispatch(userReceived(response.data))
        } catch (error) {
          if(error.response?.data.errors_or_messages)
            dispatch(errorsOrMsgsRecieved(error.response?.data.errors_or_messages))
          else
            dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
        }
    }
  }
