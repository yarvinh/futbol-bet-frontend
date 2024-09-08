import { createSlice } from "@reduxjs/toolkit";


const leagueSlice = createSlice({
    name: "leagues",
    initialState: {
        leagues: []
    },
    reducers: {
        leaguesReceived: (state, action)=>{
            state.leagues = action.payload
        }
    }
})




export const {leaguesReceived} = leagueSlice.actions
export default leagueSlice.reducer