import React, { Component, useState } from 'react';
import {dispatchComment,deleteComment} from '../../actions/comments'
import { connect } from 'react-redux';
import Reply from './Reply'
import Likes from '../games/Likes'



const Comment = (props)=> {

  const [newComment, setNewComment] = useState({
    game_id: '',
    user_id: '',
    comment: '',
    displayMoreComments: 3,
  })

  const handleDeleteOnClick = (e) => {
     props.deleteComment( {id: e.target.value})
  }

  const dateAndTime = (d)=>{
    const date = new Date(d)
    const time = new Date(d)
    return (
      <div>
          <span>{date.toDateString()} at </span>      
          <span>{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
      </div>
    )
  }


  const handleOnSubmit = (e)=>{
    e.preventDefault()
    const params = {comment: newComment.comment, user_id: props.currentUser.id, game_id: props.game.id}
    props.dispatchComment(params)
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
      if(props.comments[i]){
      newCommentsArr.push(props.comments[i])
    }
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

  const comments = () =>{    
      return ( 
        props.game && display10Comments().map((comment)=>{
          return  (    
            <div   className='post' key={comment.id}> 
              <div >
                {props.currentUser && comment.user.id === props.currentUser.id && <button onClick={handleDeleteOnClick} className='delete' value={comment.id}>X</button>}
                <span >Posted by: {comment.user.name} {dateAndTime(comment.created_at)}</span>
              </div>
              <div className='comments'>
                <p>{comment.comment}</p>
              </div> 
              <div>
                <div>
                  {props.loggedIn && <Likes likes={comment.likes} comment_id={comment.id} user_id={props.currentUser.id} gameCommentOrReply={comment}/>}
                </div>
                <div>
                  <Reply replies={comment.replies_by_date} loggedIn={props.loggedIn} comment_id={comment.id} currentUser={props.currentUser} comment={comment}/>
                </div>  
              </div>
            </div>
          )    
        })
      )
  }

    if (props.loggedIn){
      return (
        <div>
          <div>
            <form onSubmit={handleOnSubmit} value={newComment.comment}>
              <label>What do you think about this game?</label> 
              <br></br>
              <div className='comment_textArea'>
                <textarea onChange={onChangeComment} row='1' className='auto_height' value={newComment.comment}></textarea> 
                <input type='submit' className='buttons'value='Comment'/>
              </div>
            </form>
          </div>
      <div>
        </div>
        <div className='comments_container'>
            <div>
             {comments()}
            </div>
            <div>
            {displayButton()}
          </div>
        </div>
      </div>
      );
    } else {
      return(
        <div>
            <div>
                {comments()}
             </div>
             <div>
               {displayButton()}
            </div>
        </div>
      )
    }
};


const mapDispatchToProps = dispatch => {
  return {
    dispatchComment: (action) => dispatch(dispatchComment(action)),
    deleteComment: (action) => dispatch(deleteComment(action))
  }
  }
  export default connect(null, mapDispatchToProps)(Comment)


