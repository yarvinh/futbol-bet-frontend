import axios from "axios"
import { gameReceived, gamesLoading } from "../state/gamesReducers"
import { commentsReceived,commentsLoading } from "../state/commentsReducers"

// export const fetchComments = (gameId)=>{
  
//   return (dispatch) =>{
//     dispatch(commentsLoading())
//     axios.get(`http://localhost:3000/games/${gameId}/comments`,
//     {withCredentials: true})
//     .then( response => {
//       console.log("testing comments actions")
//       dispatch(commentsReceived(response.data))
//     })
//   }
// }

export const fetchComments = (gameId) => {
  return (dispatch) => {
      dispatch(commentsLoading())
      // dispatch({ type: 'LOADING_USER'})
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



export const dispatchComment = (params) =>{
    return (dispatch) => {

    dispatch(gamesLoading())
    fetch(`http://localhost:3000/comments`,
     { 
      method: "POST", 
      headers: { "Content-type": "application/json"  , "Accept": "application/json"

     }, 
     body: JSON.stringify(params)
   }
    ).then(response => {
      return response.json()
    }).then(response => {
      dispatch(gameReceived(response))
    })
  }
}

export const deleteComment = (params) => {
  return (dispatch) => {
    fetch(`http://localhost:3000/comments/${params.id}`,
    {
      method: 'DELETE',
      header: { "Content-type": "application/json"  , "Accept": "application/json"}, 
      body: JSON.stringify(params)
    }).then(response => {
      return response.json()
    }).then(response => {
      dispatch(gameReceived(response))
    })
  }
}