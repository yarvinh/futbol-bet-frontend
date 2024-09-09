import axios from "axios"
import { serverErrors } from "../helpers/errorHelpers"
import { baseUrl } from "../helpers/urlAndPaths"
import { errorsOrMsgsRecieved } from "../state/errorsOrMsgs"
import  {teamsLoading, teamsReceived } from "../state/teamsReducer"

export const fetchTeams = (id) => {
    return async (dispatch) => {
        dispatch(teamsLoading())
      try{
        const response = await axios.get(`${baseUrl()}/teams`,{params: {league_id: id}})
        dispatch(teamsLoading(false))
        dispatch(teamsReceived(response.data))
      } catch (error){
        dispatch(teamsLoading())
        dispatch(errorsOrMsgsRecieved(serverErrors(error)))
      }
    }
  }

