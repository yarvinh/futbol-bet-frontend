import axios from 'axios'
// import ErrorsOrMsg from '../components/ErrosOrMsg'
import { SERVER_ERRORS } from './constAction'


  export const fetchCurrentUser = () => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_USER'})
        axios.get('http://localhost:3000/islogged_in', 
        {withCredentials: true})    
        .then(response => {
            dispatch({ type: 'ADD_USER', user: response.data})
        })
        .catch((error) => {
          dispatch({ type: 'ERRORS_OR_MESSAGES', ErrorsOrMsg: {from: 'server', errors: SERVER_ERRORS}})
        })

    }

  }