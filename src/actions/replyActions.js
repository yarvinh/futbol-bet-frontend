import { gameReceived } from "../state/gamesReducers"

export const dispatchReply = (params) =>{
    return (dispatch) => {
    // dispatch({ type: 'LOADING_REPLIES'})
    fetch(`http://localhost:3000/replies`,
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

export const deleteReply = (params) => {
  return (dispatch) => {
    fetch(`http://localhost:3000/replies/${params.id}`,
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