import axios from "axios"
import {repliesRecieved,repliesLoading,replyReceived} from "../state/commentsReducers"
import { SERVER_ERROR } from "./errorsConst"
import { token } from "../helpers/token"
import { errorsOrMsgsRecieved } from "../state/errorsOrMsgs"
import { serverErrors } from "../helpers/errorHelpers"
import { baseUrl } from "../helpers/urlAndPaths"

export const fetchReplies = ({gameId,commentId})=>{
  return async (dispatch) => {
    dispatch(repliesLoading())
    try {
      const response = await axios.get(`${baseUrl()}/games/${gameId}/comments/${commentId}/replies`,{params:{array_length: 0},withCredentials: true})
      dispatch(repliesRecieved({response: response.data, commentId: commentId}))
    } catch (error) {
      dispatch(repliesLoading())
      if (error.response?.data.errors_or_messages)
        dispatch(errorsOrMsgsRecieved(error.response.data.errors_or_messages))
      else
        dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
    }
  }
}
export const dispatchReply = ({path,reply,payload}) =>{
  return async (dispatch) => {
      try {
        const response  = await axios.post(`${baseUrl()}/${path}`,payload,{ withCredentials: true, params:{reply: reply } ,headers: token('multipart/form-data')})
        dispatch(replyReceived(response.data))
      } catch (error){
        if (error.response?.data.errors_or_messages)
        dispatch(errorsOrMsgsRecieved(error.response.data.errors_or_messages))
      else
        dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
      }
  }
}

export const deleteReply = ({gameId,commentId,replyId}) => {
  return async (dispatch) => {
      try {  
        const response = await  axios.delete(`${baseUrl()}/games/${gameId}/comments/${commentId}/replies/${replyId}`,{ headers: token(),withCredentials: true})
        dispatch(replyReceived(response.data))
      } catch (error){
        dispatch(errorsOrMsgsRecieved(serverErrors(error)))
      }
   
  }
}

export const fetchMoreReplies = ({gameId,commentId,payload}) =>{
  return async (dispatch) => {
    dispatch(repliesLoading())
    try{
      const response = await axios.get(`${baseUrl()}/games/${gameId}/comments/${commentId}/replies`,{params:{array_length: payload},withCredentials: true})
      dispatch(errorsOrMsgsRecieved({response: response.data, commentId: commentId}))
    } catch (error){
      dispatch(repliesLoading())
      dispatch(errorsOrMsgsRecieved(serverErrors(error)))
    }
  }
}
