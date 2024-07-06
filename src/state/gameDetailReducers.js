import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        gameLoading: true,
        game: {},
        gameLikes: []
    },
    reducers: {
      gameLoading: (state)=>{
          state.gameLoading = true
      },

      gameReceived: (state,action) =>{
        state.game = action.payload
      },

      gameLikesReceived: (state,action) => {
        state.game.likes =  action.payload
      }
    }
})


export const {
  gameLoading,
  gameReceived,
  gameLikesReceived
} = gameSlice.actions

export default gameSlice.reducer