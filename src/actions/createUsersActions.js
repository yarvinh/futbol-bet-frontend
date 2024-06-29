import axios from 'axios'
import ErrorsOrMsg from '../components/ErrosOrMsg'

export const createUser = (user) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_NEW_USER'})
        axios.post('http://localhost:3000/users', user, {withCredentials: true})
        .then(response => {
          const errorsOrMsg = response.data.errors_or_messages
          errorsOrMsg ? dispatch({ type: 'ERRORS_OR_MESSAGES', errorsOrMsg: errorsOrMsg}) : dispatch({ type: 'ADD_NEW_USER', user: response.data})
      })
    }
  }
