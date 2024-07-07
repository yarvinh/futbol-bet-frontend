import axios from "axios"
import { betsReceived, gameLoading } from "../state/gameDetailReducers"
import { gameReceived, gamesLoading } from "../state/gamesReducers"

export const dispatchBets = (params) =>{
    return (dispatch) => {
    dispatch(gameLoading())
    axios.post(`http://localhost:3000/bets`,params,{ withCredentials: true})
    .then(response => {
      dispatch(betsReceived(response.data))
    })
    
  }
}