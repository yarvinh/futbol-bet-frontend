import { gameReceived, gamesLoading } from "../state/gamesReducers"

export const dispatchBets = (params) =>{
    return (dispatch) => {
    dispatch(gamesLoading())
    fetch(`http://localhost:3000/bets`,
     { 
      method: "POST", 
      headers: { "Content-type": "application/json", 
      "Accept": "application/json"

     }, 
     body: JSON.stringify(params)
   }
    ).then(response => {
      return response.json()
    }).then(response => {
      dispatch(gameReceived(response))
    })
    
  }
}