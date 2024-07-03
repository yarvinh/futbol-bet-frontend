import { gamesLoading, gamesReceived, gameReceived} from "../state/gamesReducers";

export const dispatchLikes = (params) =>{
    return (dispatch) => {
    dispatch(gamesLoading(true))
      fetch(`http://localhost:3000/likes`,{ 
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
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}

export const dislike = (like) =>{
  return (dispatch) => {
  dispatch(gamesLoading(true))
  fetch(`http://localhost:3000/likes/${like.id}`,{ 
    method: "DELETE", 
    headers: { "Content-type": "application/json"  , "Accept": "application/json"
  }, 
   body: JSON.stringify(like)
 }
  ).then(response => {
    return response.json()
  }).then(response => {
    dispatch(gameReceived(response))
  })
}
}

