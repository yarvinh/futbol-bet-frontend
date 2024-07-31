import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { findIndexById, findItemById } from "../../helpers/arrayHelper"

const CommentDetails = () => {
    const {commentId} = useParams()
  
    const comment = useSelector((state)=>{
        console.log(state)
        return findItemById({array: state.comments.comments, id: commentId})
    })

    // console.log(comment)

    return (
        <section>

        </section>
    )
}


export default CommentDetails