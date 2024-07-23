import { createSlice } from "@reduxjs/toolkit";

const errorsOrMsgSlice = createSlice({
    name: "errors_or_msgs",
    initialState: {
        errorsOrMsg: { 
            from: 'none',
            errors: []
        }
    },
    reducers: {
        errorsOrMsgsRecieved: (state,action)=>{
            state.errorsOrMsg = action.payload
        }
    }
})

export const {errorsOrMsgsRecieved} = errorsOrMsgSlice.actions
export default errorsOrMsgSlice.reducer