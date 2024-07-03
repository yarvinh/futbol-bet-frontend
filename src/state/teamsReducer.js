import { createSlice } from "@reduxjs/toolkit";

const teamsSlice = createSlice({
    name: 'teams',
    initialState: {
        teams: [],
        teamsLoading: true
    },
    
    reducers: {
        teamsReceived: (state,action)=>{
          state.teams = action.payload
          state.teamsLoading = false
        },
        teamsLoading: (state,action) => {
           state.teamsLoading = action.payload
        }
    }
})

export const { teamsReceived, teamsLoading,filterGames } = teamsSlice.actions
export default teamsSlice.reducer

