import {deleteComment} from '../../actions/comments'
import { useDispatch } from 'react-redux';
import Likes from '../games/Likes'
import { dateAndTime } from '../../heplers/functionsHelpers';
import RepliesContainer from '../../containers/RepliesContainer';

const Comment = ( {comment,currentUser,loggedIn} )=> {
  const dispatch = useDispatch()
  const handleDeleteOnClick = (e) => {
    dispatch(deleteComment( {id: e.target.value}))
  }

  return  (    
    <section  className='post' key={comment.id}> 
      <div >
        {currentUser && comment.user.id === currentUser.id && <button onClick={handleDeleteOnClick} className='delete' value={comment.id}>X</button>}
        <span >Posted by: {comment.user.name} {dateAndTime(comment.created_at)}</span>
      </div>
      <div className='comments'>
        <p>{comment.comment}</p>
      </div> 
      <div>
        <div className='likes'>
          {loggedIn && <Likes likes={comment.likes} comment_id={comment.id} user_id={currentUser.id} gameCommentOrReply={comment}/>}
        </div>
        <RepliesContainer replies={comment.replies_by_date} loggedIn={loggedIn} comment_id={comment.id} currentUser={currentUser} comment={comment}/>
      </div>
    </section>
  )
};

export default Comment


