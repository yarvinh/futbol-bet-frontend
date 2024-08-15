import axios from 'axios'
import { SERVER_ERROR } from "./errorsConst";
import { serverErrorsRecieved } from "../state/serverErrors";
import { token } from "../helpers/token";
import { errorsOrMsgsRecieved } from '../state/errorsOrMsgs';
import { serverErrors } from '../helpers/errorHelpers';
import { baseUrl } from '../helpers/urlAndPaths';

export const dispatchLikes = ({payLoad,likesReceived}) =>{
    return async (dispatch) => {
      try {
        const response = await axios.post(`${baseUrl()}/likes`,payLoad,
        { 
          headers: token(),
          withCredentials: true
        })
        dispatch(likesReceived({response: response.data}))
      } catch (error) {
        dispatch(errorsOrMsgsRecieved(serverErrors(error)))
      }
   }
  
}

export const dislike = ({likeId, likesReceived}) =>{
  return async (dispatch) => {
    try{
      const response = await axios.delete(`${baseUrl()}/likes/${likeId}`,{ 
        headers: token(),
        withCredentials: true
      })
      dispatch(likesReceived({response: response.data, likeId: likeId}))
    } catch (error){
      dispatch(errorsOrMsgsRecieved(serverErrors(error)))
    }
}
}

