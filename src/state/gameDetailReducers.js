import { createSlice } from "@reduxjs/toolkit";
import { addItemToArray, deleteItemFromArray } from "../heplers/arrayHelper";

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
        if (action.payload.response.like_removed){
            deleteItemFromArray({array: state.game.likes, id: action.payload.likeId})
        }else{
            addItemToArray({array: state.game.likes, item: action.payload.response})  
        }
      },
      betsReceived: (state,action)=>{
        addItemToArray({array: state.game.bets, item: action.payload}) 
      }
    }
})


export const {
  gameLoading,
  gameReceived,
  gameLikesReceived,
  betsReceived
} = gameSlice.actions

export default gameSlice.reducer