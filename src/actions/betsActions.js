import axios from "axios"
import { betsReceived, gameLoading } from "../state/gameDetailReducers"
import { SERVER_ERROR } from "./errorsConst"
import { errorsOrMsgsRecieved } from "../state/errorsOrMsgs"
import { token } from "../helpers/token"

export const dispatchBets = (payload) =>{
    return (dispatch) => {
    dispatch(gameLoading())
    axios.post(`http://localhost:3000/bets`,payload,{headers: token(),withCredentials: true})
    .then(response => {
      const errors = response.data.errors_or_messages
      if (errors){
        console.log(errors)
        dispatch(errorsOrMsgsRecieved(errors))
      }else{
        dispatch(betsReceived(response.data))
      }
    }).catch(error => dispatch(errorsOrMsgsRecieved(SERVER_ERROR)))
    
  }
}