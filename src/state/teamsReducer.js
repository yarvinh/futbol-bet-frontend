
import { createSlice } from "@reduxjs/toolkit";

const teamsSlice = createSlice({
    name: 'teams',
    initialState: {
        teams: [],
        teamsLoading: true
    },
    reducer: {
        teamsReceived: (state,action)=>{
          state.teams = action.payload
        },
        teamsLoading: (state,action) => {
           state.teamsLoading = action.payload
        },

    
    }

})

export const { teamsReceived, teamsLoading } = teamsSlice.actions

export default teamsSlice.reducer

