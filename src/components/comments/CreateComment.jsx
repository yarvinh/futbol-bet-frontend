import { useState } from "react"
import { useDispatch} from "react-redux"
import { dispatchComment} from "../../actions/comments"
import { useParams } from "react-router"
import { useRef } from "react"

const CreateComment = ({loggedIn,currentUser}) => {
    
    const {gameId} = useParams()
    const dispatch = useDispatch()
    const [newComment, setNewComment] = useState({
        game_id: '',
        user_id: '',
        comment: '',
        displayMoreComments: 3,
    })
    const ref = useRef()

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        const payload = {comment: newComment.comment, user_id: currentUser.id, game_id: gameId}
        dispatch(dispatchComment({comment: payload}))
        setNewComment({
            ...newComment,
            comment: ""
        })
        ref.current.style.height = '46px'
    }

    const onChangeComment = (e) => {
        e.preventDefault()
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight)+"px";
        setNewComment({
        ...newComment,
        comment: e.target.value,
        })

    }

    return (
        <div>
            <form onSubmit={handleOnSubmit} value={newComment.comment}>
            <label>What do you think about this game?</label> 
            <br></br>
            {loggedIn && <div className='comment_textArea'>
                <textarea ref={ref}  onChange={onChangeComment} row='1' className='auto_height' value={newComment.comment}></textarea> 
                {<input type='submit' className='buttons'value='Comment'/>}
            </div>}
            </form>
        </div>
    )

}

export default CreateComment