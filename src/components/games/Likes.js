import "../../styles/likes.css"
import { connect } from 'react-redux';
import { dispatchLikes, dislike } from '../../actions/likesActions'
import { LIKED_STYLE, NO_LIKE_STYLE } from '../../consts/likesConst';
import { useParams } from "react-router";
import { gameLikesReceived } from "../../state/gameDetailReducers";

const Likes = ({likes,dislike, dispatchLikes, user_id,comment_id, reply_id,likesReceived})=>{
    const {gameId} = useParams()
    const likedIt = likes.find(like => like.user_id  === user_id)

    const handleOnClick = (e) => {
        const payLoad = {user_id: user_id, game_id: gameId, comment_id: comment_id, reply_id: reply_id}
        likedIt ? dislike({likeId: likedIt.id, likesReceived: gameLikesReceived}) : dispatchLikes({payLoad: payLoad, likesReceived: likesReceived})
    }

    return(
        <div className='like-container'>     
            <div className='like'>
                <img onClick={handleOnClick} src='/instagram-likes.svg'  style={likedIt? NO_LIKE_STYLE : LIKED_STYLE } /> 
            </div>
            <span> Likes {likes.length}</span>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchLikes: (action) => dispatch(dispatchLikes(action)),
    dislike: (action) => dispatch(dislike(action)),
    
  }
}
export default connect(null, mapDispatchToProps)(Likes)