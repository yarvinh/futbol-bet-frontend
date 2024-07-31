import { createSlice } from "@reduxjs/toolkit";

const displayElementSlice = createSlice({
    name: "isDisplay",
    initialState: {
        isDisplay: false,
        className: "profile-inf",
        emojisDisplay: false
    },
    reducers: {
        displayElementReceived: (state,action) => {
          state.isDisplay = !state.isDisplay 
          state.className = action.payload
        },

        displayEmojis: (state) =>{
            state.emojisDisplay = !state.emojisDisplay
        }
    }
})

export const {displayElementReceived,displayEmojis} = displayElementSlice.actions
export default displayElementSlice.reducer



