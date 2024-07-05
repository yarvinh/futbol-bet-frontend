import { gameReceived, gamesLoading } from "../state/gamesReducers"

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