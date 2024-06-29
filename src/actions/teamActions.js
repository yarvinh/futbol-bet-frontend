import { SERVER_ERRORS } from "./constAction"
export const fetchTeams = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_TEAMS'})
      fetch('http://localhost:3000/teams').then(response => {
        return response.json()
      }).then(responseJSON => {
         dispatch({ type: 'ADD_TEAMS', teams: responseJSON })
      })
      .catch((error)=>{
        dispatch({ type: 'ERRORS_OR_MESSAGES', ErrorsOrMsg: {from: 'server', errors: SERVER_ERRORS}})
      })
    }
  }