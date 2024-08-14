import axios from "axios"
import { commentsReceived,commentsLoading, commentReceived,moreCommentsReceived } from "../state/commentsReducers"
import { errorsOrMsgsRecieved } from "../state/errorsOrMsgs"
import { SERVER_ERROR } from "./errorsConst"
import { token } from "../helpers/token"


export const fetchComments = ({gameId,comments_length}) => {
  return (dispatch) => {
      dispatch(commentsLoading())
      axios.get(`http://localhost:3000/games/${gameId}/comments`, 
      {params: {comments_length}, withCredentials: true})    
      .then(response => {
        dispatch(commentsReceived(response.data))
      })
      .catch((error) => {
        dispatch(commentsLoading())
        if(error.response)
          dispatch(errorsOrMsgsRecieved(error.response.data.errors_or_messages))
        else
          dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
      })
  }
}

export const fetchMoreComments = ({gameId,comments_length}) => {
  return (dispatch) => {
      dispatch(commentsLoading())
      axios.get(`http://localhost:3000/games/${gameId}/comments`, 
      {params: {comments_length}, withCredentials: true})    
      .then(response => {
        dispatch(moreCommentsReceived(response.data))
      })
      .catch((error) => {
        dispatch(commentsLoading())
        if (error.response)
          dispatch(errorsOrMsgsRecieved(error.response.data.errors_or_messages))
        else
          dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
      })
  }
}



export const dispatchComment = ({path, comment, payload}) =>{
    return (dispatch) => {
    dispatch(commentsLoading())
    axios.post(`http://localhost:3000/${path}`,
     payload, {headers: token('multipart/form-data'), params:{comment: comment} ,withCredentials: true})
     .then(response => {
      dispatch(commentReceived(response.data))
    })
    .catch((error)=>{
      if(error.response?.data.errors_or_messages)
        dispatch(errorsOrMsgsRecieved(error.response.data.errors_or_messages))
      else
        dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
    })
  }
}

export const deleteComment = (payload) => {
  return async (dispatch) => {
    try{
      const response = await axios.delete(`http://localhost:3000/games/${payload.gameId}/comments/${payload.commentId}`,
      {headers: token() ,withCredentials: true})
      dispatch(commentReceived({response: response.data, id: payload.commentId}))
    }catch (error){
      if (error.response?.data.errors_or_messages)
        dispatch(errorsOrMsgsRecieved(error.response?.data.errors_or_messages))
      else
        dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
    }
  }
}