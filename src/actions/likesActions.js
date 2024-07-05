import { gameLoading, gameReceived, likeReceived} from "../state/gameDetailReducers";

export const dispatchLikes = (params) =>{
    return (dispatch) => {
    dispatch(gameLoading(true))
      fetch(`http://localhost:3000/likes`,{ 
        method: "POST", 
        headers: { "Content-type": "application/json"  , "Accept": "application/json"
     }, 
     body: JSON.stringify(params)
   }
    ).then(response => {
      return response.json()
    }).then(response => {
      console.log('create like',response)
        dispatch(likeReceived(response))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}

export const dislike = (like) =>{
  return (dispatch) => {
  dispatch(gameLoading(true))
  fetch(`http://localhost:3000/likes/${like.id}`,{ 
    method: "DELETE", 
    headers: { "Content-type": "application/json"  , "Accept": "application/json"
  }, 
   body: JSON.stringify(like)
 }
  ).then(response => {
    return response.json()
  }).then(response => {
    console.log('delete like',response)
    dispatch(likeReceived(response))
  })
}
}

