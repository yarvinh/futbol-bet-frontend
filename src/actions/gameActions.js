import { gamesLoading, gamesReceived, filterGames} from "../state/gamesReducers"

export const fetchGames = () => {
    return (dispatch) => {
      dispatch(gamesLoading())
      fetch('http://localhost:3000/games').then(response => {
        return response.json()
      }).then(responseJSON => {
          dispatch(gamesReceived(responseJSON))
      })
    }
  }
  



  export const  dispatchSetFilter = (payload) => {
      return (dispatch) =>{
        dispatch(filterGames(payload))
      }
  }