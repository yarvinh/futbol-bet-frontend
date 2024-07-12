import { gameLoading } from "../state/gameDetailReducers";
import axios from 'axios'
import { SERVER_ERROR } from "./errorsConst";
import { serverErrorsRecieved } from "../state/serverErrors";

export const dispatchLikes = ({payLoad,likesReceived}) =>{
    return async (dispatch) => {
      const response = await axios.post(`http://localhost:3000/likes`,payLoad,
      { 
       withCredentials: true
      })

      try {
        dispatch(likesReceived({response: response.data}))
      } catch (error) {
        dispatch(serverErrorsRecieved(SERVER_ERROR))
        new Error("Something went wrong with the server, please try again later.")
      }
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

