import axios from 'axios'
import { userLoading, userReceived } from '../state/userReducer'
import { errorsOrMsgsRecieved } from '../state/errorsOrMsgs'
import { SERVER_ERROR } from './errorsConst'

  export const fetchCurrentUser = () => {
    return async (dispatch) => {
        dispatch(userLoading())
          
        try {
          const response = await axios.get('http://localhost:3000/islogged_in', {withCredentials: true})  
          const errors = response.data.errors_or_messages
          errors ? dispatch(errorsOrMsgsRecieved(errors)) : dispatch(userReceived(response.data))
        } catch (error) {
          dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
        }
    }
  }

  export const fetchLogin = (user) => {
    return async (dispatch) => {
      dispatch(userLoading())
        
        try {
          const response = await axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
          const errorsOrMsg = response.data.errors_or_messages
          errorsOrMsg ? dispatch(errorsOrMsgsRecieved(errorsOrMsg)) : dispatch(userReceived(response.data))
        } catch(error){
          dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
        }
    }
  }
  
  export const fetchLogout = (user)=>{
    return async (dispatch) => {
      dispatch(userLoading())
      
      try {
        const response = await axios.post('http://localhost:3000/signout', {user}, {withCredentials: true})
        dispatch( userReceived(response.data) )
      } catch (error)  {
        dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
      }
    }
  }