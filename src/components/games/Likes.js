import { connect } from 'react-redux';
import { dispatchLikes, dislike } from '../../actions/likesActions'
import { LIKED_STYLE, NO_LIKE_STYLE } from '../../consts/likesConst';

const Likes = ({likes,dislike, dispatchLikes, user_id,game_id,comment_id, reply_id})=>{
    const handleOnClick = (e) => {
        const likesParams = {user_id: user_id, game_id: game_id, comment_id: comment_id, reply_id: reply_id}
        likedIt ? dislike(likedIt) : dispatchLikes(likesParams)
    }

    const likedIt = likes.find(like => like.user_id  === user_id)

    return(
        <div>     
            <div>
                <img onClick={handleOnClick} src='/instagram-likes.svg'  style={likedIt? NO_LIKE_STYLE : LIKED_STYLE } /> 
            </div>
            <span>Likes {likes.length}</span>
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