import { gamesLoading, gamesReceived, filterGames,} from "../state/gamesReducers"
import { gameReceived, gameLoading } from "../state/gameDetailReducers"
import { errorsOrMsgsRecieved } from "../state/errorsOrMsgs"
import { SERVER_ERROR } from "./errorsConst"
export const fetchGames = () => {
    return (dispatch) => {
      dispatch(gamesLoading())
      fetch('http://localhost:3000/games').then(response => {
        return response.json()
      }).then(responseJSON => {
          dispatch(gamesReceived(responseJSON))
      }).catch(error=>{
        dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
      })
    }
}

export const fetchGame = (id) => {
  return (dispatch) => {
    dispatch(gameLoading())
    fetch(`http://localhost:3000/games/${id}`).then(response => {
      return response.json()
    }).then(responseJSON => {
        dispatch(gameReceived(responseJSON))
    }).catch(error => {
      dispatch(errorsOrMsgsRecieved(SERVER_ERROR))
    })
  }
}
  
  export const  dispatchSetFilter = (payload) => {
      return (dispatch) =>{
        dispatch(filterGames(payload))
      }
  }