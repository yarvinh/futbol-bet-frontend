import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
    name: 'team',
    initialState: {
        team: {},
        teamLoading: false
    },
    
    reducers: {
        teamReceived: (state,action)=>{
          state.team = action.payload
          state.teamLoading = false
        },
        teamLoading: (state) => {
           state.teamLoading = !state.teamLoading
        }
    }
})

export const { teamReceived, teamLoading } = teamSlice.actions
export default teamSlice.reducer