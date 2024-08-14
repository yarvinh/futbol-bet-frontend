import { gamesLoading, gamesReceived, filterGames,} from "../state/gamesReducers"
import { gameReceived, gameLoading } from "../state/gameDetailReducers"
import { errorsOrMsgsRecieved } from "../state/errorsOrMsgs"
import {  serverErrors } from "./errorsConst"
import axios from "axios"

export const fetchGames = () => {
    return async (dispatch) => {
      dispatch(gamesLoading())
      try {
       const response = await axios.get('http://localhost:3000/games')
       dispatch(gamesReceived(response.data))
      }catch (error){
        dispatch(gamesLoading())
        dispatch(errorsOrMsgsRecieved(serverErrors(error.message)))
      }
    }
}

export const fetchGame = (id) => {
  return async (dispatch) => {
    dispatch(gameLoading())
    try {
      const response = await axios.get(`http://localhost:3000/games/${id}`)
      dispatch(gameReceived(response.data))
    }catch (error){
      dispatch(gameLoading())
      dispatch(errorsOrMsgsRecieved(serverErrors(error.message)))
    }
  }
}
  
  export const  dispatchSetFilter = (payload) => {
      return (dispatch) =>{
        dispatch(filterGames(payload))
      }
  }