import { createSlice } from "@reduxjs/toolkit";

const serverErrorsSlice = createSlice({
    name: 'errors',
    initialState: {
        serverErrors: []
    },

    reducers:{
        serverErrorsRecieved: (state,action)=>{
            state.serverErrors = action.payload
        }
    }
})

export const {serverErrorsRecieved} = serverErrorsSlice.actions 
export default serverErrorsSlice.reducer
