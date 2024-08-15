import  {useEffect } from 'react';
import Comment from '../components/comments/Comment';
import { useParams } from 'react-router';
import { dispatchComment, fetchComments, fetchMoreComments } from "../actions/comments"
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Input from '../components/forms/Input';
import ErrorsOrMsg from '../components/ErrosOrMsg';

const CommentsContainer = ( {game, currentUser,loggedIn} )=> {
    const commentsLoading= useSelector(state => state.comments.commentsLoading)
    const comments = useSelector(state => state.comments.comments)
    const dispatch = useDispatch()
    const {gameId} = useParams()
    const errorsOrMsg = useSelector((state)=> state.errorsOrMsg.errorsOrMsg)
    useEffect(()=>{
        dispatch(fetchComments({gameId: gameId, comments_length: 0}))
    },[])
    const displayOnSubmit=(e)=>{
        e.preventDefault()
        dispatch(fetchMoreComments({gameId: gameId, comments_length: comments.length}))
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
            <div className='comment-form-container'>
                {loggedIn && <Input 
                upLoadImages={true}
                name='comment' 
                path={`games/${gameId}/comments`} 
                createAction={dispatchComment} 
                ids={{user_id: currentUser.id,game_id: game.id}} 
                submitButton={true} 
                currentUser={currentUser}/>}
            </div>
            {errorsOrMsg.from.includes("comment") || errorsOrMsg.from.includes("reply") ?
             <ErrorsOrMsg errors={errorsOrMsg.errors}/> : null}
            <div>
                {commentsLoading && <Loading/>}
                {game && comments?.map(comment=> <Comment key={comment.id} comment={comment} currentUser={currentUser} loggedIn={loggedIn}/>)}
                {loggedIn && displayButton()}
            </div>
        </section>
    );
};

export default CommentsContainer



