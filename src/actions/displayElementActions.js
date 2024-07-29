import { displayElementReceived } from "../state/displayElementReducer"

export const displayElement = (payload) => {

    return async (dispatch) =>{
        try {
          dispatch(displayElementReceived(payload))
        } catch (error){
            console.log(error)
        }
    }
}