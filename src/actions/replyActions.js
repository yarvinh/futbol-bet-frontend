import axios from "axios"
import {repliesRecieved,repliesLoading,replyReceived,moreLikesReceived} from "../state/commentsReducers"
import { serverErrorsRecieved } from "../state/serverErrors"
import { SERVER_ERROR } from "./errorsConst"

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
    return (dispatch) => {
    fetch(`http://localhost:3000/games/${gameId}/comments/${commentId}/replies`,
     { 
      method: "POST", 
      headers: { "Content-type": "application/json"  , "Accept": "application/json"

     }, 
     body: JSON.stringify(payload)
   }
    ).then(response => {
      return response.json()
    }).then(response => {
      dispatch(replyReceived(response))
    }).catch( error => dispatch(serverErrorsRecieved(SERVER_ERROR)))
  }
}

export const deleteReply = ({gameId,commentId,replyId}) => {
  return async (dispatch) => {
   const response = await  axios.delete(`http://localhost:3000/games/${gameId}/comments/${commentId}/replies/${replyId}`,
   {withCredentials: true})
      try {  
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
      dispatch(moreLikesReceived({response: response.data, commentId: commentId}))
    } catch (error){
      dispatch(serverErrorsRecieved(SERVER_ERROR))
    }
  }
}
