import axios from 'axios'
import { baseUrl } from '../helpers/urlAndPaths'
import { errorsOrMsgsRecieved } from '../state/errorsOrMsgs'
import { serverErrors } from '../helpers/errorHelpers'
import { leaguesReceived } from '../state/leaguesReducer'

export const fetchLeagues = () => {
    return async (dispatch)=>{
        try {
            const response = await axios.get(`${baseUrl()}/leagues`)
            dispatch(leaguesReceived(response.data))
        } catch (error) {
            dispatch(errorsOrMsgsRecieved(serverErrors(error.message)))
        }
    }
}