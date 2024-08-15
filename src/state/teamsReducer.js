import { createSlice } from "@reduxjs/toolkit";

const teamsSlice = createSlice({
    name: 'teams',
    initialState: {
        teams: [],
        teamsLoading: false
    },
    
    reducers: {
        teamsReceived: (state,action)=>{
          state.teams = action.payload
          state.teamsLoading = false
        },
        teamsLoading: (state) => {
           state.teamsLoading = !state.teamsLoading
        }
    }
})

export const { teamsReceived, teamsLoading,filterGames } = teamsSlice.actions
export default teamsSlice.reducer

