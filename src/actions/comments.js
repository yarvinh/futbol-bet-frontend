import axios from "axios"
import { commentsReceived,commentsLoading, commentReceived } from "../state/commentsReducers"
import { errorsOrMsgsRecieved } from "../state/errorsOrMsgs"
import { SERVER_ERROR } from "./errorsConst"


export const fetchComments = ({gameId,comments_length}) => {
  return (dispatch) => {
      dispatch(commentsLoading())
      axios.get(`http://localhost:3000/games/${gameId}/comments`, 
      {params: {comments_length}, withCredentials: true})    
      .then(response => {
        dispatch(commentsReceived(response.data))
      })
      .catch((error) => {
        dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
      })
  }
}



export const dispatchComment = (payload) =>{
    return (dispatch) => {
    dispatch(commentsLoading())
    axios.post(`http://localhost:3000/games/${payload.game_id}/comments`,
     payload, { withCredentials: true})
     .then(response => {
      dispatch(commentReceived(response.data))
    })
    .catch((error)=>{
      dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
    })
  }
}

export const deleteComment = (payload) => {
  return (dispatch) => {
    axios.delete(`http://localhost:3000/games/${payload.gameId}/comments/${payload.commentId}`,
    {withCredentials: true}).then(response => {
      dispatch(commentReceived({response: response.data, id: payload.commentId}))
    }).catch(error => dispatch(errorsOrMsgsRecieved(SERVER_ERROR)))
  }
}