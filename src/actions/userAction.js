import axios from 'axios'
import { userLoading, userReceived } from '../state/userReducer'
import { errorsOrMsgsRecieved } from '../state/errorsOrMsgs'
import { SERVER_ERROR, serverErrors } from './errorsConst'
import { removeLoginToken, token } from '../helpers/token'

  export const fetchCurrentUser = () => {
    return async (dispatch) => {
        dispatch(userLoading()) 
        try {
          const response = await axios.get('http://localhost:3000/islogged_in', {headers: token(), withCredentials: true})  
          const errors = response.data.errors_or_messages
          errors ? dispatch(errorsOrMsgsRecieved(errors)) : dispatch(userReceived(response.data))
        } catch (error) {
          dispatch(userLoading())
          if(error.response?.status === 401)
            dispatch(errorsOrMsgsRecieved(error.response.data.errors_or_messages))
          else
            dispatch(errorsOrMsgsRecieved(serverErrors(error.message)))
        }
    }
  }

  export const fetchLogin = (user) => {
    return async (dispatch) => {
      dispatch(userLoading())
        try {
          const response = await axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
          if(response.data.token){
            localStorage.setItem("token", response.data.token);
          }
           dispatch(userReceived(response.data))
        } catch(error){
          dispatch(userLoading())
          if(error.response?.status === 401)
            dispatch(errorsOrMsgsRecieved(error.response.data.errors_or_messages))
          else
            dispatch(errorsOrMsgsRecieved(serverErrors(error.message)))
        }
    }
  }
  
  export const fetchLogout = (user)=>{
    removeLoginToken()
    return async (dispatch) => {
      dispatch(userLoading())
      
      try {
        const response = await axios.post('http://localhost:3000/signout', {user}, {withCredentials: true})
        dispatch( userReceived(response.data))
      } catch (error)  {
        dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
      }
    }
  }