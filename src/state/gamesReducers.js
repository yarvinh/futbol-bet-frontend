
import { createSlice } from "@reduxjs/toolkit";

const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        games: [],
        gamesLoading: true,
        filter: "all"
    },
    reducers: {
      gamesLoading: (state)=>{
          state.gamesLoading = true
      },
      gamesReceived: (state,actions)=>{
        state.games = actions.payload
        state.gamesLoading = false
      },
      filterGames: (state,actions) =>{
        state.filter = actions.payload
      }
    }
})


export const {gamesReceived,gamesLoading,filterGames} = gamesSlice.actions
export default gamesSlice.reducer