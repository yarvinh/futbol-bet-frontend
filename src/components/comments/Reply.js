import { useDispatch } from 'react-redux';
import {deleteReply} from '../../actions/replyActions'
import Likes from '../games/Likes'
import { dateAndTime } from '../../heplers/functionsHelpers';
import { useParams } from 'react-router';
import { replyLikesReceived } from '../../state/commentsReducers';

const Reply = ({reply,currentUser,loggedIn,commentId}) => {
  const {gameId} = useParams()
  const dispatch = useDispatch()
  const handleOnClick = (e)=>{
    const params = {gameId: gameId, commentId: commentId ,replyId: reply.id}
    dispatch(deleteReply(params))
  }

  return (
    <div   className='replies' key={reply.id}> 
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