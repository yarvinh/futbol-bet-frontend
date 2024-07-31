import { useDispatch, useSelector } from 'react-redux';
import {fetchReplies} from '../actions/replyActions'
import { useState } from 'react';
import Reply from '../components/replies/Reply';
import { useParams } from 'react-router';
import Loading from '../components/Loading';
import {fetchMoreReplies} from '../actions/replyActions'
import Input from '../components/forms/Input';
import { useRef } from 'react';

const RepliesContainer = ({replies,currentUser,comment_id,loggedIn,repliesTotal,lastReply}) => {
  const loading = useSelector(state=> state.comments.repliesLoading)

  const dispatch = useDispatch()
  const {gameId} = useParams()
  const ref = useRef()
  const [displayReplies, setDisplayReplies] = useState({
        reply: '',
        accordion: 'replies_accordion',
        displayAcordion: 'hide_replies',
        displayReplies: 3,
      }
  )
  
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
    const container = ref.current
    return (

      <section className=''>
        <button onClick={handleOnclickReply} className={displayReplies.accordion}> {`${repliesTotal} Replies`} </button>
        <div className={displayReplies.displayAcordion}>
          <div ref={ref} className='replies_wraper'> 
              {replies?.map(reply => <Reply lastReply={lastReply} key={reply?.id} reply={reply} currentUser={currentUser} loggedIn={loggedIn} commentId={comment_id}/>)}
               {loading && <Loading/>}
               <form onSubmit={handleOnGetMoreReplies} className="reload" >  
                <input  className='reload-input' type='submit' value={'Load more replies'}/> 
              </form> 
          </div>
          {loggedIn && <Input container={container} currentUser={currentUser} comment_id={comment_id}/>}
        </div>
      </section>
    );
};

export default RepliesContainer
