import {deleteComment} from '../../actions/comments'
import { useDispatch } from 'react-redux';
import Likes from '../games/Likes'
import { dateAndTime } from '../../helpers/functionsHelpers';
import RepliesContainer from '../../containers/RepliesContainer';
import { useParams } from 'react-router';
import { commentLikesReceived } from '../../state/commentsReducers';
import { fetchReplies } from '../../actions/replyActions';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Comment = ( {comment,currentUser,loggedIn} )=> {
  const {gameId} = useParams()
  const dispatch = useDispatch() 
  const [displayReplies, setDisplayReplies] = useState({
    reply: '',
    accordion: 'replies_accordion',
    displayAcordion: 'hide_replies',
    displayReplies: 3,
  }
)

  const handleDeleteOnClick = (e) => {
    dispatch(deleteComment( {commentId: comment.id, gameId: gameId}))
  }

  const handleOnclickReply = (e)=>{
    dispatch(fetchReplies({gameId: gameId, commentId: comment.id}))

  }

  return  (    
    <section  className='post' key={comment.id}> 
      <div >
        {currentUser && comment.user?.id === currentUser.id && <button onClick={handleDeleteOnClick} className='delete' value={comment.id}>X</button>}
        <span >Posted by: {comment.user?.name} {dateAndTime(comment.created_at)}</span>
      </div>
      <div className='comments'>
        <p>{comment.comment}</p>
      </div> 
      <div>
        <div className='likes'>
          {loggedIn && <Likes likes={comment.likes} ownerId={{comment_id: comment.id, user_id: currentUser.id}} likesReceived={commentLikesReceived}  comment_id={comment.id} user_id={currentUser.id} gameCommentOrReply={comment}/>}
        </div>
        {/* <button onClick={handleOnclickReply} > {`${comment.replies_total} Replies`} </button> */}
        {/* <Link to={`comments/${comment.id}/replies`} className='replies-link'>Replies</Link> */}
        <RepliesContainer replies={comment.replies} repliesTotal={comment.replies_total} loggedIn={loggedIn} comment_id={comment.id} currentUser={currentUser} comment={comment}/>
      </div>
    </section>
  )
};

export default Comment


