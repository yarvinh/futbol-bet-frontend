import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { dispatchReply } from "../../actions/replyActions";
import { useRef } from "react";

const Input = ({currentUser, comment_id})=>{
    const {gameId} = useParams()
    const dispatch = useDispatch()
    const ref = useRef()
    const [reply, setReply] = useState('')
  const [image, setImage] = useState(null)

  const handleOnImg = (e) =>{
    if (e.target.files && e.target.files[0]) {
        setImage(URL.createObjectURL(e.target.files[0]));
    }
  }
 
    const handleOnChange = (e)=>{
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight)+"px";
        setReply(e.target.value,)
    }
    
    const handleOnKeyUp = (e)=>{
          if (e.code  === 'Enter'){
            const payload= {user_id: currentUser.id, comment_id: comment_id, reply: reply }
            dispatch(dispatchReply({payload: {reply: payload}, gameId: gameId, commentId: comment_id}))
            setReply('')
            ref.current.style.height = "25px"
            setImage(null)
          }
    }

    return(
        <div>
            <form  className="reply-form" onKeyUp={handleOnKeyUp} >
                {image && <img id="blah" className="comment-and-reply-image" src={image} alt="your image" />}
                <textarea ref={ref} onChange={handleOnChange} rows="1" className="auto_height" value={reply}></textarea> 
                <div className="input-container">
                  <input ref={ref} onChange={handleOnImg} name="img" className='input-file' type="file" accept="image/png, image/jpeg"/>
                </div>
            </form> 
        </div>
    )
}


export default Input