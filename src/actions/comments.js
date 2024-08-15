import axios from "axios"
import { commentsReceived,commentsLoading, commentReceived,moreCommentsReceived } from "../state/commentsReducers"
import { errorsOrMsgsRecieved } from "../state/errorsOrMsgs"
import { token } from "../helpers/token"
import { serverErrors } from "../helpers/errorHelpers"
import { baseUrl } from "../helpers/urlAndPaths"


export const fetchComments = ({gameId,comments_length}) => {
  return (dispatch) => {
      dispatch(commentsLoading())
      axios.get(`${baseUrl()}/games/${gameId}/comments`, 
      {params: {comments_length}, withCredentials: true})    
      .then(response => {
        dispatch(commentsReceived(response.data))
      })
      .catch((error) => {
        dispatch(commentsLoading())
        dispatch(errorsOrMsgsRecieved(serverErrors(error)))
      })
  }
}

export const fetchMoreComments = ({gameId,comments_length}) => {
  return (dispatch) => {
      dispatch(commentsLoading())
      axios.get(`${baseUrl()}/games/${gameId}/comments`, 
      {params: {comments_length}, withCredentials: true})    
      .then(response => {
        dispatch(moreCommentsReceived(response.data))
      })
      .catch((error) => {
        dispatch(commentsLoading())
        dispatch(errorsOrMsgsRecieved(serverErrors(error)))
      })
  }
}



export const dispatchComment = ({path, comment, payload}) =>{
    return (dispatch) => {
    dispatch(commentsLoading())
    axios.post(`${baseUrl()}/${path}`,
     payload, {headers: token('multipart/form-data'), params:{comment: comment} ,withCredentials: true})
     .then(response => {
      dispatch(commentReceived(response.data))
    })
    .catch((error)=>{
      dispatch(commentsLoading())
      dispatch(errorsOrMsgsRecieved(serverErrors(error)))
    })
  }
}

export const deleteComment = (payload) => {
  return async (dispatch) => {
    try{
      const response = await axios.delete(`${baseUrl()}/games/${payload.gameId}/comments/${payload.commentId}`,
      {headers: token() ,withCredentials: true})
      dispatch(commentReceived({response: response.data, id: payload.commentId}))
    }catch (error){
      dispatch(errorsOrMsgsRecieved(serverErrors(error)))
    }
  }
}