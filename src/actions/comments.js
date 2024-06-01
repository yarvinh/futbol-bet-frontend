export const dispatchComment = (params) =>{
    return (dispatch) => {
    dispatch({ type: 'LOADING_COMMENTS'})
    fetch(`http://localhost:3000/comments`,
     { 
 
      method: "POST", 
      headers: { "Content-type": "application/json"  , "Accept": "application/json"

     }, 
     body: JSON.stringify(params)
   }
    ).then(response => {
      return response.json()
    }).then(response => {
      dispatch({ type: 'ADD_COMMENTS', games: response })
    })
  }
}

export const deleteComment = (params) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_COMMENTS'})
    fetch(`http://localhost:3000/comments/${params.id}`,
    {
      method: 'DELETE',
      header: { "Content-type": "application/json"  , "Accept": "application/json"}, 
      body: JSON.stringify(params)
    }).then(response => {
      return response.json()
    }).then(response => {
      dispatch({ type: 'DELETE_COMMENT', games: response })
    })
  }
}