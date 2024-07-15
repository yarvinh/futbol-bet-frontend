import  { useState,useEffect } from 'react';
import Comment from '../components/comments/Comment';
import CreateComment from '../components/comments/CreateComment';
import { useParams } from 'react-router';
import { fetchComments } from "../actions/comments"
import { useDispatch, useSelector } from 'react-redux';

const CommentsContainer = ( {game, currentUser,loggedIn} )=> {

    const comments = useSelector(state => state.comments.comments)

    const dispatch = useDispatch()
    const {gameId} = useParams()

    useEffect(()=>{
        dispatch(fetchComments({gameId: gameId, comments_length: 0}))
    },[])
  
    const displayOnSubmit=(e)=>{
        e.preventDefault()
        dispatch(fetchComments({gameId: gameId, comments_length: comments.length}))
    }

    const displayButton = ()=>{
        return (
        <form onSubmit={displayOnSubmit} >  
            <input  className='reload' type='submit' value='Reload more comments'/> 
        </form>
        )
    }

    return (
        <section className='comments_container'>
          <CreateComment game={game} loggedIn={loggedIn} currentUser={currentUser}/>
        <div>
        </div>
        <div>
            {game && comments?.map(comment=> <Comment key={comment.id} comment={comment} currentUser={currentUser} loggedIn={loggedIn}/>)}
            {loggedIn && displayButton()}
        </div>
      </section>
    );
};

export default CommentsContainer



