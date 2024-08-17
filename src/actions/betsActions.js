import axios from "axios"
import { errorsOrMsgsRecieved } from "../state/errorsOrMsgs"
import { token } from "../helpers/token"
import { betLoading, betReceived } from "../state/betReducer"
import { serverErrors } from "../helpers/errorHelpers"
import { baseUrl } from "../helpers/urlAndPaths"

export const dispatchBets = (payload) =>{
    return (dispatch) => {
    dispatch(betLoading())
    axios.post(`${baseUrl()}/games/${payload.game_id}/bets`,payload,{headers: token(),withCredentials: true})
    .then(response => {
      dispatch(betReceived(response.data))
    }).catch(error => {
      dispatch(betLoading())
      dispatch(errorsOrMsgsRecieved(serverErrors(error)))
    }) 
  }
}

export const getMyBet = ({gameId})=>{
  return async (dispatch) =>{
    dispatch(betLoading())
    try {
      const response = await axios.get(`${baseUrl()}/games/${gameId}/bets`,{headers: token(),withCredentials: true})
      const didBet = response.data.didBet
      if (!didBet)
        dispatch(betReceived(response.data))
    } catch (error){
      dispatch(betLoading())
      dispatch(errorsOrMsgsRecieved(serverErrors(error)))
    }
  }
}