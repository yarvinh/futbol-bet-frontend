import { gameLoading } from "../state/gameDetailReducers";
import axios from 'axios'
import { SERVER_ERROR } from "./errorsConst";
import { serverErrorsRecieved } from "../state/serverErrors";

export const dispatchLikes = ({payLoad,likesReceived}) =>{
    return (dispatch) => {
    // dispatch(gameLoading(true))
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
      dispatch(serverErrorsRecieved(SERVER_ERROR))
      new Error("Something went wrong with the server, please try again later.")
    });
  }
}

export const dislike = ({likeId, likesReceived}) =>{
  return (dispatch) => {
  axios.delete(`http://localhost:3000/likes/${likeId}`,{ 
   withCredentials: true
  })
  .then(response => {
    dispatch(likesReceived({response: response.data, likeId: likeId}))
  })
}
}

