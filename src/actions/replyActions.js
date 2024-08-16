import axios from "axios"
import {repliesRecieved,repliesLoading,replyReceived, moreRepliesReceived} from "../state/commentsReducers"
import { token } from "../helpers/token"
import { errorsOrMsgsRecieved } from "../state/errorsOrMsgs"
import { serverErrors } from "../helpers/errorHelpers"

export const fetchReplies = ({gameId,commentId})=>{
  return async (dispatch) => {
    dispatch(repliesLoading())
    try {
      const response = await axios.get(`http://localhost:3000/games/${gameId}/comments/${commentId}/replies`,{params:{array_length: 0},withCredentials: true})
      dispatch(repliesRecieved({response: response.data, commentId: commentId}))
    } catch (error) {
      dispatch(repliesLoading())
      dispatch(errorsOrMsgsRecieved(serverErrors(error)))
    }
  }
}
export const dispatchReply = ({path,reply,payload}) =>{
  return async (dispatch) => {
      try {
        const response  = await axios.post(`http://localhost:3000/${path}`,payload,{ withCredentials: true, params:{reply: reply } ,headers: token('multipart/form-data')})
        dispatch(replyReceived(response.data))
      } catch (error){
        dispatch(errorsOrMsgsRecieved(serverErrors(error)))
      }
  }
}

export const deleteReply = ({gameId,commentId,replyId}) => {
  return async (dispatch) => {
      try {  
        const response = await  axios.delete(`http://localhost:3000/games/${gameId}/comments/${commentId}/replies/${replyId}`,{ headers: token(),withCredentials: true})
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
      const response = await axios.get(`http://localhost:3000/games/${gameId}/comments/${commentId}/replies`,{params:{array_length: payload},withCredentials: true})
      dispatch(moreRepliesReceived({response: response.data, commentId: commentId}))
    } catch (error){
      dispatch(repliesLoading())
      dispatch(errorsOrMsgsRecieved(serverErrors(error)))
    }
  }
}
