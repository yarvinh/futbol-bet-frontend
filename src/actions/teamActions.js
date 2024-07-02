import  {teamsLoading, teamsReceived } from "../state/teamsReducer"
import { SERVER_ERRORS } from "./constAction"
export const fetchTeams = () => {
    return (dispatch) => {

      dispatch(teamsLoading(true))

      fetch('http://localhost:3000/teams').then(response => {
        return response.json()
      }).then(responseJSON => {
        dispatch(teamsReceived(responseJSON))
        //  dispatch({ type: 'ADD_TEAMS', teams: responseJSON })
      })
      .catch((error)=>{
        // dispatch(teamsReceived())
        dispatch({ type: 'ERRORS_OR_MESSAGES', ErrorsOrMsg: {from: 'server', errors: SERVER_ERRORS}})
      })
    }
  }

