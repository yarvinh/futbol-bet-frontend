import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    
    name: "user",
    initialState: {
        userLoading: false,
        user: {}
    },

    reducers: {
        userLoading: (state)=>{
            state.userLoading = true
        },
        userReceived: (state,action)=>{
            state.user = action.payload
            state.userLoading = false
        },
        loginReceived: (state,action) => {
           state.user = action.payload
        }
    }

})

export const {userLoading,userReceived} = userSlice.actions
export default userSlice.reducer