import axios from 'axios'


export const fetchEditUser = (user) => {
   
  return (dispatch) => {
    dispatch({ type: 'LOADING_USER'})
  
      axios.patch(`http://localhost:3000/users/${user.user_id}`, {user}, {withCredentials: true})
      .then(response=> {
        console.log(response.data)
        dispatch({ type: 'ADD_USER', user: response.data })
    
      })
    }
  
}