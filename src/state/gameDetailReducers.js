import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        gameLoading: true,
        game: {}
    },
    reducers: {
      gameLoading: (state)=>{
          state.gameLoading = true
      },

      gameReceived: (state,action) =>{
        state.game = action.payload
      },

      likeReceived: (state,action) => {
        state.game.likes =  action.payload
      }
    }
})


export const {
  gameLoading,
  gameReceived,
  likeReceived
} = gameSlice.actions

export default gameSlice.reducer