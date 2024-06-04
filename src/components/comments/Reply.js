import { connect } from 'react-redux';
import {dispatchReply,deleteReply} from '../../actions/replyActions'
import Likes from '../games/Likes'
import { dateAndTime } from '../../heplers/functionsHelpers';


const Reply = ({reply,currentUser,loggedIn,user_id}) => {
  
  const handleOnClick = (e)=>{
    const params = {user_id: user_id, id: e.target.value}
    deleteReply(params)
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
            {loggedIn? <Likes likes={reply.likes} reply_id={reply.id} user_id={currentUser.id} gameCommentOrReply={reply}/>:null}
        </div>
      </div>
    </div>  
  )
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchReply: (action) => dispatch(dispatchReply(action)),
    deleteReply: (action) => dispatch(deleteReply(action))
  }
  }
  export default connect(null, mapDispatchToProps)(Reply)