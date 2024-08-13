import { gamesLoading, gamesReceived, filterGames,} from "../state/gamesReducers"
import { gameReceived, gameLoading } from "../state/gameDetailReducers"
import { errorsOrMsgsRecieved } from "../state/errorsOrMsgs"
import { SERVER_ERROR, serverErrors } from "./errorsConst"
export const fetchGames = () => {
    return (dispatch) => {
      dispatch(gamesLoading())
      fetch('http://localhost:3000/games').then(response => {
        return response.json()
      }).then(responseJSON => {
          dispatch(gamesReceived(responseJSON))
      }).catch(error=>{
        dispatch(gamesLoading())
        dispatch(errorsOrMsgsRecieved(serverErrors(error.message)))
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
      dispatch(gameLoading())
      dispatch(errorsOrMsgsRecieved(serverErrors(error.message)))
    })
  }
}
  
  export const  dispatchSetFilter = (payload) => {
      return (dispatch) =>{
        dispatch(filterGames(payload))
      }
  }