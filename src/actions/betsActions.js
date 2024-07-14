import axios from "axios"
import { betsReceived, gameLoading } from "../state/gameDetailReducers"
import { SERVER_ERROR } from "./errorsConst"
import { errorsOrMsgsRecieved } from "../state/errorsOrMsgs"

export const dispatchBets = (params) =>{
    return (dispatch) => {
    dispatch(gameLoading())
    axios.post(`http://localhost:3000/bets`,params,{ withCredentials: true})
    .then(response => {
      dispatch(betsReceived(response.data))
    }).catch(error => dispatch(errorsOrMsgsRecieved(SERVER_ERROR)))
    
  }
}