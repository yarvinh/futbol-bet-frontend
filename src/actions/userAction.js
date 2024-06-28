import axios from 'axios'
import ErrorsOrMsg from '../components/ErrosOrMsg'


  export const fetchCurrentUser = () => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_USER'})
        axios.get('http://localhost:3000/islogged_in', 
        {withCredentials: true})    
        .then(response => {
            dispatch({ type: 'ADD_USER', user: response.data})
        })
        .catch((error) => {
          dispatch({ type: 'ERRORS_OR_MESSAGES', ErrorsOrMsg: {from: 'server', errors: ['Somwthing went wrong with the server. Please try again later']}})
        })

    }

  }