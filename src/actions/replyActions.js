import axios from "axios"
import {repliesRecieved,repliesLoading,replyReceived,moreRepliesReceived} from "../state/commentsReducers"
import { serverErrorsRecieved } from "../state/serverErrors"
import { SERVER_ERROR } from "./errorsConst"
import { token } from "../helpers/token"

export const fetchReplies = ({gameId,commentId})=>{
  return async (dispatch) => {
    dispatch(repliesLoading())
    try {
      const response = await axios.get(`http://localhost:3000/games/${gameId}/comments/${commentId}/replies`,{params:{array_length: 0},withCredentials: true})
      dispatch(repliesRecieved({response: response.data, commentId: commentId}))
    } catch (error) {
      dispatch(serverErrorsRecieved(SERVER_ERROR))
    }
  }
}
export const dispatchReply = ({payload, commentId, gameId}) =>{
  return async (dispatch) => {
      try {
        const response  = await axios.post(`http://localhost:3000/games/${gameId}/comments/${commentId}/replies`,payload,{ withCredentials: true, headers: token()})
        dispatch(replyReceived(response.data))
      } catch (error){
        dispatch(serverErrorsRecieved(SERVER_ERROR))
      }
  }
}

export const deleteReply = ({gameId,commentId,replyId}) => {
  return async (dispatch) => {
      try {  
        const response = await  axios.delete(`http://localhost:3000/games/${gameId}/comments/${commentId}/replies/${replyId}`,{ headers: token(),withCredentials: true})
        dispatch(replyReceived(response.data))
      } catch (error){
        dispatch(serverErrorsRecieved(SERVER_ERROR))
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
      dispatch(serverErrorsRecieved(SERVER_ERROR))
    }
  }
}
