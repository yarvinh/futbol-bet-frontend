import { gameLoading, gameReceived, } from "../state/gameDetailReducers";
import axios from 'axios'

export const dispatchLikes = ({payLoad,likesReceived}) =>{
    return (dispatch) => {
    dispatch(gameLoading(true))
      fetch(`http://localhost:3000/likes`,{ 
        method: "POST", 
        headers: { "Content-type": "application/json"  , "Accept": "application/json"
     }, 
     body: JSON.stringify(payLoad)
   }
    ).then(response => {
      return response.json()
    }).then(response => {
        dispatch(likesReceived({response: response}))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}

export const dislike = ({likeId, likesReceived}) =>{
  return (dispatch) => {
  dispatch(gameLoading(true))
  axios.delete(`http://localhost:3000/likes/${likeId}`,{ 
   withCredentials: true
  })
  .then(response => {
    console.log('delete like',response)
    dispatch(likesReceived({response: response.data, likeId: likeId}))
  })
}
}

