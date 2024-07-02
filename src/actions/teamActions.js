import  {teamsLoading, teamsReceived } from "../state/teamsReducer"
import { SERVER_ERRORS } from "./constAction"

export const fetchTeams = () => {
    return (dispatch) => {
      dispatch(teamsLoading(true))
      fetch('http://localhost:3000/teams').then(response => {
        return response.json()
      }).then(responseJSON => {
        dispatch(teamsLoading(false))
        dispatch(teamsReceived(responseJSON))
      })
      .catch((error)=>{
        dispatch({ type: 'ERRORS_OR_MESSAGES', ErrorsOrMsg: {from: 'server', errors: SERVER_ERRORS}})
      })
    }
  }

