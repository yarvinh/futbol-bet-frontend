
import axios from 'axios'

export const fetchLogin = (user) => {
  return (dispatch) => {
    dispatch({ type: "LOADING_LOGIN"})
      axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
      .then(response=> {
        console.log(response)
          dispatch({ type: 'LOGIN', user: response.data })
    
      })
      .catch((error) => {
        dispatch({ type: 'ERRORS_OR_MESSAGES', ErrorsOrMsg:{from: 'server', errors: ['Something went wrong with the server. Please try again later']}})
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
    .catch((error) => {
      dispatch({ type: 'ERRORS_OR_MESSAGES', ErrorsOrMsg:{from: 'server', errors: ['Something went wrong with the server. Please try again later']}})
    })
  }
}



