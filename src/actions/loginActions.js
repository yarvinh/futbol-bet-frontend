
import axios from 'axios'






export const fetchLogin = (user) => {
  return (dispatch) => {
    dispatch({ type: "LOADING_LOGIN"})
      axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
      .then(response=> {
          dispatch({ type: 'LOGIN', user: response.data })
    
      })
  }
}

export const fetchLogout = (user)=>{
  return (dispatch) => {
    dispatch({ type: "LOADING_LOGIN"})
    axios.post('http://localhost:3000/signout', {user}, {withCredentials: true})
    .then(response => {
      dispatch({ type: 'LOGOUT', user: response.data })
    })
  }
}



