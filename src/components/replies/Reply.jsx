import { useDispatch, useSelector } from 'react-redux';
import {deleteReply} from '../../actions/replyActions'
import Likes from '../games/Likes'
import { dateAndTime } from '../../helpers/functionsHelpers';
import { useParams } from 'react-router';
import { replyLikesReceived } from '../../state/commentsReducers';
import { useEffect, useRef } from 'react';

const Reply = ({reply,currentUser,loggedIn,commentId}) => {
  const {gameId} = useParams()
  const dispatch = useDispatch()
  const ref = useRef()
  const handleOnClick = (e)=>{
    const params = {gameId: gameId, commentId: commentId ,replyId: reply.id}
    dispatch(deleteReply(params))
  }

  useEffect(()=>{
    // console.log(lastReply.id === reply.id)
    // if(lastReply.id === reply.id)
    //   ref.current.scrollIntoView({behavior: "smooth"})
  },[])

  return (
    <div ref={ref} className='replies' key={reply.id}> 
      <div>
        {currentUser && reply.user.id === currentUser.id && <button onClick={handleOnClick} className='delete' value={reply.id}>x</button>}
        <span >Reply by: {reply.user.name} {dateAndTime(reply.created_at)}</span>
      </div>
      <div className='reply'>
        <p >{reply.reply}</p>
      </div> 
      <div>
        <div>
            {loggedIn? <Likes ownerId={{reply_id: reply.id, user_id: currentUser.id}} likesReceived={replyLikesReceived} replyLikesReceived likes={reply.likes} reply_id={reply.id} user_id={currentUser.id} gameCommentOrReply={reply}/>:null}
        </div>
      </div>
    </div>  
  )
};

export default Reply