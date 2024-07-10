import axios from "axios"
import { commentsReceived,commentsLoading, commentReceived } from "../state/commentsReducers"


export const fetchComments = (gameId) => {
  return (dispatch) => {
      dispatch(commentsLoading())
      axios.get(`http://localhost:3000/games/${gameId}/comments`, 
      {withCredentials: true})    
      .then(response => {
        dispatch(commentsReceived(response.data))
      })
      .catch((error) => {
        // dispatch({ type: 'ERRORS_OR_MESSAGES', ErrorsOrMsg: {from: 'server', errors: SERVER_ERRORS}})
      })
  }
}



export const dispatchComment = (payload) =>{
    return (dispatch) => {
    dispatch(commentsLoading())
    axios.post(`http://localhost:3000/games/${payload.game_id}/comments`,
     payload, { withCredentials: true})
     .then(response => {
      console.log(response)
      dispatch(commentReceived(response.data))
    })
  }
}

export const deleteComment = (payload) => {
  return (dispatch) => {
    axios.delete(`http://localhost:3000/games/${payload.gameId}/comments/${payload.commentId}`,
    {withCredentials: true}).then(response => {
      dispatch(commentReceived({response: response.data, id: payload.commentId}))
    })
  }
}