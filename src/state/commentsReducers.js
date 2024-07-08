import { createSlice } from "@reduxjs/toolkit";
import { addItemToArray, deleteItemFromArray } from "../heplers/arrayHelper";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
       commentsLoading: true,
       comments: []
    },

    commentsLoading: ((state)=>{
       state.commentsLoading = true
    }),
    commentsReceived: (state,action) => {
        state.comments = action.payload
        state.commentsLoading = false
    },
    commentReceived: (state,action) => {
        if (action.payload.response.comment_removed){
            deleteItemFromArray({array: state.comments, id: action.payload.commentId})
        }else{
            addItemToArray({array: state.comments, item: action.payload})  
        }
    }
})


export const {commentsReceived,commentReceived,commentsLoading} = commentsSlice.actions

export default commentsSlice.reducer