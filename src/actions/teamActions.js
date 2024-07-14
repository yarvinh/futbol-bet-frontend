import { serverErrorsRecieved } from "../state/serverErrors"
import  {teamsLoading, teamsReceived } from "../state/teamsReducer"
import { SERVER_ERROR } from "./errorsConst"

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
        dispatch(serverErrorsRecieved(SERVER_ERROR))
      })
    }
  }

