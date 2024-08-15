import axios from 'axios'
import { userLoading, userReceived } from '../state/userReducer'
import { errorsOrMsgsRecieved } from '../state/errorsOrMsgs'
import { removeLoginToken, token } from '../helpers/token'
import { serverErrors } from '../helpers/errorHelpers'
import { baseUrl } from '../helpers/urlAndPaths'

  export const fetchCurrentUser = () => {
    return async (dispatch) => {
        dispatch(userLoading()) 
        try {
          const response = await axios.get(`${baseUrl()}/islogged_in`, {headers: token(), withCredentials: true})  
          const errors = response.data.errors_or_messages
          errors ? dispatch(errorsOrMsgsRecieved(errors)) : dispatch(userReceived(response.data))
        } catch (error) {
          dispatch(userLoading())
          dispatch(errorsOrMsgsRecieved(serverErrors(error)))
        }
    }
  }

  export const fetchLogin = (user) => {
    return async (dispatch) => {
      dispatch(userLoading())
        try {
          const response = await axios.post(`${baseUrl()}/login`, {user}, {withCredentials: true})
          if(response.data.token){
            localStorage.setItem("token", response.data.token);
          }
           dispatch(userReceived(response.data))
        } catch(error){
          dispatch(userLoading())
          dispatch(errorsOrMsgsRecieved(serverErrors(error)))
        }
    }
  }
  
  export const fetchLogout = (user)=>{
    removeLoginToken()
    return async (dispatch) => {
      dispatch(userLoading())
      
      try {
        const response = await axios.post(`${baseUrl()}/signout`, {user}, {withCredentials: true})
        dispatch( userReceived(response.data))
      } catch (error)  {
        dispatch(userLoading())
        dispatch(errorsOrMsgsRecieved(serverErrors(error)))
      }
    }
  }