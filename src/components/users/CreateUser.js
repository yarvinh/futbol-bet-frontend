import { connect } from 'react-redux';
import '../../styles/styles.css'
import { createUser } from '../../actions/createUsersActions';
import ErrorsOrMsg from '../ErrosOrdMsg';
import { useRef } from 'react';

const  CreateUser = ({user,createUser})=>{
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
      createUser({user: newUserRef.current})
  }

  return (
      <div className="container d-flex justify-content-center align-items-center">
        <form onSubmit={handleOnSubmit} className="form">
        {user.user?.messages && <ErrorsOrMsg errorsOrMsg={user.user.messages}/>}
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

const mapStateToProps = state => { 
  return {
     user: state.user,
     loading: state.loading
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
     createUser: (action) => dispatch(createUser(action))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)

