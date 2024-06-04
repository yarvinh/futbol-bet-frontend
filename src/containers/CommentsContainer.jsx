import  { useState } from 'react';
import {dispatchComment} from '../actions/comments'
import { connect } from 'react-redux';
import Comment from '../components/comments/Comment';

const CommentsContainer = ( {game,currentUser,dispatchComment,comments,loggedIn} )=> {

    const [newComment, setNewComment] = useState({
        game_id: '',
        user_id: '',
        comment: '',
        displayMoreComments: 3,
    })

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        const params = {comment: newComment.comment, user_id: currentUser.id, game_id: game.id}
        dispatchComment(params)
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

    const displayOnSubmit=(e)=>{
        e.preventDefault()
        let amount = newComment.displayMoreComments + 10
        setNewComment({
            ...newComment,
            displayMoreComments: amount,
        })
    }

    const display10Comments=()=>{
        const  newCommentsArr = []
        for (let i = 0; i < newComment.displayMoreComments; i++){
            if(comments[i])
            newCommentsArr.push(comments[i])
        }
        return newCommentsArr 
    }

    const displayButton = ()=>{
        return (
        <form onSubmit={displayOnSubmit} >  
            <input  className='reload' type='submit' value='Reload more comments'/> 
        </form>
        )
    
    }

    return (
        <section className='comments_container'>
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
      <div>
        </div>
        <div>
            {game && display10Comments().map(comment=> <Comment key={comment.id} comment={comment} currentUser={currentUser} loggedIn={loggedIn}/>)}
            {loggedIn && displayButton()}

        </div>
      </section>
    );
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchComment: (action) => dispatch(dispatchComment(action)),
    // deleteComment: (action) => dispatch(deleteComment(action))
  }
}

export default connect(null , mapDispatchToProps)(CommentsContainer)


