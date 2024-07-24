import { createSlice } from "@reduxjs/toolkit";

const betSlice =  createSlice({
    name: 'bet',
    initialState: {
        betLoading: false,
        bet: {}
    },
    reducers: {
        betLoading: (state)=>{
            state.betLoading = true
        },
        betReceived: (state,action)=>{
            state.bet = action.payload
        }
    }
})

export const {betLoading, betReceived} = betSlice.actions
export default betSlice.reducer
