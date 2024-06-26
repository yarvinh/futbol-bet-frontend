import { connect } from 'react-redux';
import {dispatchReply,deleteReply} from '../actions/replyActions'
import { useState } from 'react';
import Reply from '../components/comments/Reply';


const RepliesContainer = ({dispatchReply,replies,currentUser,comment_id,loggedIn}) => {

  const [displayReplies, setDisplayReplies] = useState({
        reply: '',
        accordion: 'replies_accordion',
        displayAcordion: 'hide_replies',
        displayReplies: 3,
      }
  )

  const handleOnKeyUp = (e)=>{
    if (e.code  === 'Enter'){
      const params = {user_id: currentUser.id, comment_id: comment_id, reply: displayReplies.reply }
      dispatchReply(params)
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

  const displayOnSubmit = (e)=>{
    e.preventDefault()
    let amount = displayReplies.displayReplies + 10
    setDisplayReplies({
        ...displayReplies,
        displayReplies: amount,
    })
  }

  const display10Replies=()=>{
    const  newRepliesArr = []
    for (let i = 0; i < displayReplies.displayReplies; i++){
      if(replies[i])
      newRepliesArr.push(replies[i])
    }
      return newRepliesArr 
    }

    return (
      <div>
        <button onClick={handleOnclickReply} className={displayReplies.accordion}> {`${replies?.length} Replies`} </button>
        <div className={displayReplies.displayAcordion}>
              {replies && display10Replies().map(reply => <Reply key={reply?.id} reply={reply} currentUser={currentUser} loggedIn={loggedIn} user_id={currentUser?.id}/>)}
              <form onSubmit={displayOnSubmit} >  
                <input  className='reload' type='submit' value='Reload more replies'/> 
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
    dispatchReply: (action) => dispatch(dispatchReply(action)),
    deleteReply: (action) => dispatch(deleteReply(action))
  }
}
  
export default connect(null, mapDispatchToProps)(RepliesContainer )