import {useDispatch,useSelector } from 'react-redux';
import '../../styles/styles.css'
import { createUser } from '../../actions/createUsersActions';
import ErrorsOrMsg from '../ErrosOrMsg';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

const  CreateUser = ()=>{
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const errorsOrMsg = useSelector(state => state.errorsOrMsg.errorsOrMsg)
  const user = useSelector(state => state.user)
  console.log(user)
  const newUserRef = useRef({
      name: "",
      email: "",
      username: "" ,
      password:  "",
      password_confirmation:""
  })

  const handleOnChange=(e)=>{
     newUserRef.current = {
      ...newUserRef.current,
      [e.target.name]: e.target.value
     }
  }

  const handleOnSubmit = (e) => {
      e.preventDefault()
      dispatch(createUser({user: newUserRef.current}))
  }

  useEffect(()=>{
    
  },[user])

  return (
      <div className="container d-flex justify-content-center align-items-center">
        <form onSubmit={handleOnSubmit} className="form">
          {errorsOrMsg.from.includes('create_user') && <ErrorsOrMsg {...(errorsOrMsg.errors ? { errors: errorsOrMsg.errors } :{msg: errorsOrMsg.msg })} />}
          <label className="mt-5"> Name: </label>
          <input onChange={handleOnChange} className="form-control" name="name" type='text'/> <br/>
          <label >Email:</label >
          <input onChange={handleOnChange} className="form-control" name="email" type='text'/> <br/>
          <label >Username:</label >
          <input onChange={handleOnChange}  className="form-control" name="username" type='text'/> <br/>
          <label > Password: </label >
          <input onChange={handleOnChange} className="form-control" name="password" type='password'/> <br/>
          <label > Confirm password:</label >
          <input onChange={handleOnChange} className="form-control" name="password_confirmation" type='password'/> <br/>
          <button type='submit' className="btn btn-primary">Submit</button>
        </form>
      </div> 
  );

};


export default CreateUser

