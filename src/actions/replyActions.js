import axios from "axios"
import { gameReceived } from "../state/gamesReducers"
import {repliesRecieved,repliesLoading,replyReceived} from "../state/commentsReducers"


export const fetchReplies = ({gameId,commentId})=>{
  return async (dispatch) => {
    dispatch(repliesLoading())
    try {
      const response = await axios.get(`http://localhost:3000/games/${gameId}/comments/${commentId}/replies`,{withCredentials: true})
      dispatch(repliesRecieved({response: response.data, commentId: commentId}))
    } catch (error) {

    }
  }
}
export const dispatchReply = ({payload, commentId, gameId}) =>{
    return (dispatch) => {
    fetch(`http://localhost:3000/games/${gameId}/comments/${commentId}/replies`,
     { 
      method: "POST", 
      headers: { "Content-type": "application/json"  , "Accept": "application/json"

     }, 
     body: JSON.stringify(payload)
   }
    ).then(response => {
      return response.json()
    }).then(response => {
      dispatch(replyReceived(response))
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