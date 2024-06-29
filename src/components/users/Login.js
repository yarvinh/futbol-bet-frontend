import React, { Component, useRef } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { fetchLogin } from '../../actions/loginActions'
import '../../styles/styles.css'
import {Navigate} from 'react-router-dom'
import ErrorsOrMsg from '../ErrosOrMsg';

const Login = ()=>{
    const errorsOrMsg = useSelector(state => state.errorsOrMsg.errorsOrMsg)
    const user = useSelector( state => state.user)
    const loading = useSelector( state => state.user.loading)
    const dispatch = useDispatch()
    const loginRef = useRef({
      username: '',
      password: '',
      loggedIn: false,
    })

    const handleOnChange=(e)=>{
      loginRef.current= {
        ...loginRef.current,
        [e.target.name]: e.target.value
      }
    }
   
    const handleOnSubmit = (e) => {
       e.preventDefault()
       dispatch(fetchLogin(loginRef.current))
    }

    return(
        <section className="container h-100  d-flex  justify-content-center align-items-center login-form">
          <form onSubmit={handleOnSubmit} className="form">
              <label className="mt-3 form-label">Username</label>
              <input className="form-control" onChange={handleOnChange} name="username" type="text"/>
              <label className="form-label">Password</label >
              <input className="form-control" onChange={handleOnChange} name="password" type="password" />
            <button  className="my-4 btn btn-primary" type="submit">Login</button>
          </form>
          {errorsOrMsg.from === 'login' && <ErrorsOrMsg errors={errorsOrMsg.errors}/>}
          {user?.user?.logged_in && <Navigate to='/games'/> }     
        </section>
    );

};

export default Login