import { displayElementReceived, displayEmojis } from "../state/displayElementReducer"

export const displayElement = (payload) => {

    return async (dispatch) =>{
          dispatch(displayElementReceived(payload))
    }
}

export const displayEmojisAction = (payload) => {
    return async (dispatch) =>{
        dispatch(displayEmojis(payload))
    }
}