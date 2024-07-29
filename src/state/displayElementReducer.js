import { createSlice } from "@reduxjs/toolkit";

const displayElementSlice = createSlice({
    name: "isDisplay",
    initialState: {
        isDisplay: false,
        className: "none"
    },
    reducers: {
        displayElementReceived: (state,action) => {
          state.isDisplay = !state.isDisplay 
          state.className = action.payload
        }
    }
})

export const {displayElementReceived} = displayElementSlice.actions
export default displayElementSlice.reducer



