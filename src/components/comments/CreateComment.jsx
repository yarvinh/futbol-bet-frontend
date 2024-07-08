import { useState } from "react"
import { useDispatch} from "react-redux"
import { dispatchComment,fetchComments } from "../../actions/comments"
import { useEffect } from "react"
// import { useParams } from "react-router"


const CreateComment = ({game, loggedIn,currentUser}) => {
    // const {gameId} = useParams()
    const dispatch = useDispatch()
    const [newComment, setNewComment] = useState({
        game_id: '',
        user_id: '',
        comment: '',
        displayMoreComments: 3,
    })

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        const payload = {comment: newComment.comment, user_id: currentUser.id, game_id: game.id}
        dispatch(dispatchComment(payload))
        setNewComment({
            ...newComment,
            comment: ""
        })
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
                <textarea onChange={onChangeComment} row='1' className='auto_height' value={newComment.comment}></textarea> 
                {<input type='submit' className='buttons'value='Comment'/>}
            </div>}
            </form>
        </div>
    )

}

export default CreateComment