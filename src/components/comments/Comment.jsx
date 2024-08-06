import {deleteComment} from '../../actions/comments'
import { useDispatch } from 'react-redux';
import Likes from '../games/Likes'
import { dateAndTime } from '../../helpers/functionsHelpers';
import RepliesContainer from '../../containers/RepliesContainer';
import { useParams } from 'react-router';
import { commentLikesReceived } from '../../state/commentsReducers';
import { useState } from 'react';
import ImagesCarousel from '../carousel/ImagesCarousel';

const Comment = ( {comment,currentUser,loggedIn} )=> {
  const {gameId} = useParams()
  const dispatch = useDispatch() 
  // const [className, setClassName] = useState({
  //   container: "images-container",
  //   img: "chat-img"
  // })
  const handleDeleteOnClick = (e) => {
    dispatch(deleteComment( {commentId: comment.id, gameId: gameId}))
  }

  const handleOnFocus = (e)=>{
    console.log("testing",e.target)
   }



  return  (    
    <section className='post' key={comment.id}> 
      <div >
        {currentUser && comment.user?.id === currentUser.id && <button onClick={handleDeleteOnClick} className='delete' value={comment.id}>X</button>}
        <span >Posted by: {comment.user?.name} {dateAndTime(comment.created_at)}</span>
      </div>
      <div onScroll={handleOnFocus} className='comments'>
          {/* {comment.images?.length > 0 && <div className='images-container'>
              {comment.images.map((img)=>{
                return <img src={img.image_url} className="chat-img" key={img.id} alt="reply image"  />
              })}
          </div>} */}
          {comment.images.length > 0 && <ImagesCarousel images={comment.images}/>}
        <p>{comment.comment}</p>
      </div> 
      <div>
        <div className='likes'>
          {loggedIn && <Likes likes={comment.likes} ownerId={{comment_id: comment.id, user_id: currentUser.id}} likesReceived={commentLikesReceived}  comment_id={comment.id} user_id={currentUser.id} gameCommentOrReply={comment}/>}
        </div>
        {/* <button onClick={handleOnclickReply} > {`${comment.replies_total} Replies`} </button> */}
        <RepliesContainer comment={comment} replies={comment.replies} repliesTotal={comment.replies_total} loggedIn={loggedIn} comment_id={comment.id} currentUser={currentUser} />
      </div>
    </section>
  )
};

export default Comment


