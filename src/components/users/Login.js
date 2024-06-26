import React, { Component, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchLogin } from '../../actions/loginActions'
import '../../styles/styles.css'
import {Navigate} from 'react-router-dom'
import ErrorsOrMsg from '../ErrosOrMsg';

const Login = ({fetchLogin,user})=>{

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
       fetchLogin(loginRef.current) 
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
          {user?.user?.messages && <ErrorsOrMsg errorsOrMsg={user.user?.messages}/>}
          {user?.user?.logged_in && <Navigate to='/games'/> }     
        </section>
    );

};

const mapStateToProps = state => { 
  return {
     user: state.user,
     loading: state.user.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchLogin: (action) => dispatch(fetchLogin(action)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)