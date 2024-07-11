import { createSlice } from "@reduxjs/toolkit";
import { addItemToArray, deleteItemFromArray, findIndexById } from "../heplers/arrayHelper";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
       commentsLoading: true,
       comments: [],
       repliesLoading: true,
    },

    reducers: {
        commentsLoading: ((state)=>{
        state.commentsLoading = true
        }),
        commentsReceived: (state,action) => {
            state.comments = action.payload
            state.commentsLoading = false 
        },
        commentReceived: (state,action) => {
            if (action.payload.response?.comment_removed){
                deleteItemFromArray({array: state.comments, id: action.payload.id})
            }else{
                addItemToArray({array: state.comments, item: action.payload})  
                state.commentsLoading = false 
            }
        },
        commentLikesReceived: (state,action)=>{
            
            if (action.payload.response.like_removed) {
                let commentIndex = findIndexById({array: state.comments, id: action.payload.response.comment_id})
                deleteItemFromArray({array: state.comments[commentIndex].likes, id: action.payload.likeId})
            }else{
                let commentIndex = findIndexById({array: state.comments, id: action.payload.response?.comment_id})

                addItemToArray({array: state.comments[commentIndex].likes, item: action.payload.response})  
            }

        },
        repliesRecieved: (state,action) => {
            let commentIndex = findIndexById({array: state.comments, id: action.payload.commentId})
            state.comments[commentIndex].replies = action.payload.response
        },
        repliesLoading: (state)=>{
            state.repliesLoading = false
        }, 
        replyReceived: (state,action) => {
            
            let commentIndex = findIndexById({array: state.comments, id: action.payload.comment_id})
            console.log(commentIndex,action.payload)
            addItemToArray({array: state.comments[commentIndex].replies, item: action.payload} )
        }
    }
})


export const {
    commentsReceived,
    commentReceived,
    commentsLoading,
    commentLikesReceived,
    repliesRecieved,
    repliesLoading,
    replyReceived
} = commentsSlice.actions

export default commentsSlice.reducer