import { serverErrors } from "../helpers/errorHelpers"
import { baseUrl } from "../helpers/urlAndPaths"
import { errorsOrMsgsRecieved } from "../state/errorsOrMsgs"
import  {teamsLoading, teamsReceived } from "../state/teamsReducer"

export const fetchTeams = () => {
    return (dispatch) => {
      dispatch(teamsLoading())
      fetch(`${baseUrl()}/teams`).then(response => {
        return response.json()
      }).then(responseJSON => {
        dispatch(teamsLoading(false))
        dispatch(teamsReceived(responseJSON))
      })
      .catch((error)=>{
        dispatch(teamsLoading())
        dispatch(errorsOrMsgsRecieved(serverErrors(error)))
      })
    }
  }

