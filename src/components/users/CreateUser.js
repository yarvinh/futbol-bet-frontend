import { connect,useDispatch,useSelector } from 'react-redux';
import '../../styles/styles.css'
import { createUser } from '../../actions/createUsersActions';
import ErrorsOrMsg from '../ErrosOrMsg';
import { useRef } from 'react';

const  CreateUser = ()=>{
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const loading = useSelector(state => state.loading)
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

  return (
      <div className="container d-flex justify-content-center align-items-center">
        <form onSubmit={handleOnSubmit} className="form">
            {user.user?.errors_or_messages && <ErrorsOrMsg errors={user.user.errors_or_messages.errors}/>}
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

