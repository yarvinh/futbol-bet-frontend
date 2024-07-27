import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { dispatchReply } from "../../actions/replyActions";

const CreateReply = ({currentUser, comment_id})=>{
    const {gameId} = useParams()
    const dispatch = useDispatch()
    const [displayReplies, setDisplayReplies] = useState({
        reply: '',
        accordion: 'replies_accordion',
        displayAcordion: 'hide_replies',
        displayReplies: 3,
      }
  )
 

    const handleOnChange = (e)=>{
        e.target.style.height = "2px";
        e.target.style.height = (e.target.scrollHeight)+"px";
        setDisplayReplies({
            ...displayReplies,
            reply: e.target.value,
    
        })
    }
    
    const handleOnKeyUp = (e)=>{
        if (e.code  === 'Enter'){
          const payload= {user_id: currentUser.id, comment_id: comment_id, reply: displayReplies.reply }
          dispatch(dispatchReply({payload: {reply: payload}, gameId: gameId, commentId: comment_id}))
          setDisplayReplies({
            ...displayReplies,
            reply: ''
          })
        }
    }


    return(
        <div>
            <form className="reply-form" onKeyUp={handleOnKeyUp} >
            <img id="blah" src="#" alt="your image" />
                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"/>
                <textarea  onChange={handleOnChange} rows="1" className="auto_height" value={displayReplies.reply}></textarea>
            </form> 
        </div>
    )
}


export default CreateReply