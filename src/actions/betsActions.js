import axios from "axios"
// import { betsReceived, gameLoading } from "../state/gameDetailReducers"
import { SERVER_ERROR } from "./errorsConst"
import { errorsOrMsgsRecieved } from "../state/errorsOrMsgs"
import { token } from "../helpers/token"
import { betLoading, betReceived } from "../state/betReducer"

export const dispatchBets = (payload) =>{
    return (dispatch) => {
    dispatch(betLoading())
    axios.post(`http://localhost:3000/games/${payload.game_id}/bets`,payload,{headers: token(),withCredentials: true})
    .then(response => {
      dispatch(betReceived(response))
    }).catch(error => {
      if(error.response)
         dispatch(errorsOrMsgsRecieved(error.response.data.errors_or_messages))
      else
        dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
    })
    
  }
}

export const getMyBet = ({gameId})=>{
  return async (dispatch) =>{
    dispatch(betLoading())
    try {
      const response = await axios.get(`http://localhost:3000/games/${gameId}/bets`,{headers: token(),withCredentials: true})
      const errors = response.data.errors_or_messages
      const didBet = response.data.didBet
      if (!didBet)
        dispatch(betReceived(response.data))
      else if (errors)
        dispatch(errorsOrMsgsRecieved(response.data))
    } catch (error){
      if(error.response)
        dispatch(errorsOrMsgsRecieved(error.response.data.errors_or_messages))
      else
        dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
    }
  }
}