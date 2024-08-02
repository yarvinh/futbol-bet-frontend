import { useDispatch, useSelector } from 'react-redux';
import {deleteReply} from '../../actions/replyActions'
import Likes from '../games/Likes'
import { dateAndTime } from '../../helpers/functionsHelpers';
import { useParams } from 'react-router';
import { replyLikesReceived } from '../../state/commentsReducers';
import { useEffect, useRef } from 'react';


const Reply = ({reply,currentUser,loggedIn,commentId,}) => {
  console.log(reply.images)
  const dispatch = useDispatch()
  const {gameId} = useParams()
  const handleOnClick = (e)=>{
    const params = {gameId: gameId, commentId: commentId ,replyId: reply.id}
    dispatch(deleteReply(params))
  }

  return (
    <div className='replies' key={reply.id}> 
      <div>
        {currentUser && reply.user.id === currentUser.id && <button onClick={handleOnClick} className='delete' value={reply.id}>x</button>}
        <span >{reply.user.name} {dateAndTime(reply.created_at)}</span>
      </div>
      <div className='reply'>
          {reply.images?.length > 0 && <div className='images-container'>
            {reply.images.map((img)=>{
              return <img src={img.image_url} className="chat-img" key={img.id} alt="reply image"  />
            })}
          </div>}
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