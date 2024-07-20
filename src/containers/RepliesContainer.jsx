import { connect, useDispatch, useSelector } from 'react-redux';
import {dispatchReply,deleteReply, fetchReplies} from '../actions/replyActions'
import { useState } from 'react';
import Reply from '../components/comments/Reply';
import { useParams } from 'react-router';
import Loading from '../components/Loading';
import {fetchMoreReplies} from '../actions/replyActions'

const RepliesContainer = ({replies,currentUser,comment_id,loggedIn,repliesTotal,comment}) => {
  const loading = useSelector(state=> state.comments.repliesLoading)
  const dispatch = useDispatch()
  const {gameId} = useParams()
  const [displayReplies, setDisplayReplies] = useState({
        reply: '',
        accordion: 'replies_accordion',
        displayAcordion: 'hide_replies',
        displayReplies: 3,
      }
  )

  const handleOnKeyUp = (e)=>{
    if (e.code  === 'Enter'){
      const payload= {user_id: currentUser.id, comment_id: comment_id, reply: displayReplies.reply }
      dispatch(dispatchReply({payload: payload, gameId: gameId, commentId: comment_id}))
      setDisplayReplies({
        ...displayReplies,
        reply: ''
      })
    }
  }

  const handleOnChange = (e)=>{
    e.target.style.height = "2px";
    e.target.style.height = (e.target.scrollHeight)+"px";
    setDisplayReplies({
        ...displayReplies,
        reply: e.target.value,

    })
  }

  const handleOnclickReply = (e)=>{
    dispatch(fetchReplies({gameId: gameId, commentId: comment_id}))
    if(displayReplies.accordion !== 'replies_accordion active')
        setDisplayReplies({
            ...displayReplies,
            accordion: 'replies_accordion active',
            displayAcordion: 'display_replies'
        })
    else
        setDisplayReplies({
            ...displayReplies,
        accordion: 'replies_accordion',
        displayAcordion: 'hide_replies'
        })
  }

    const handleOnGetMoreReplies = (e) =>{
      e.preventDefault()
      dispatch(fetchMoreReplies({gameId: gameId, commentId: comment_id, payload: replies?.length}))
    }

    return (
      <div>
        <button onClick={handleOnclickReply} className={displayReplies.accordion}> {`${repliesTotal} Replies`} </button>
        <div className={displayReplies.displayAcordion}>
              {replies?.map(reply => <Reply key={reply?.id} reply={reply} currentUser={currentUser} loggedIn={loggedIn} commentId={comment_id}/>)}
               {loading && <Loading/>}
               <form onSubmit={handleOnGetMoreReplies} >  
                <input  className='reload' type='submit' value={'Reload more replies'}/> 
              </form>
                {loggedIn && 
                <form onKeyUp={handleOnKeyUp} >
                  <textarea  onChange={handleOnChange} rows="1" className="auto_height" value={displayReplies.reply}></textarea>
              </form> }
              
        </div>
      </div>
    );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteReply: (action) => dispatch(deleteReply(action))
  }
}
  
export default connect(null, mapDispatchToProps)(RepliesContainer )