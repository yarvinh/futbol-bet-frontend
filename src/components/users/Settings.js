import {useRef } from 'react';
import { connect } from 'react-redux';
import { fetchEditUser} from '../../actions/settingsActions'
import '../../styles/styles.css'


const Settings = (props) =>{

    const editRef = useRef({
               password: '',
               old_password: '',
               email: '',
               email_confirmation: '',
               name: '',
               update_type: ''
            }
    )

    const handleOnChange = (e) => {
        editRef.current = {
            ...editRef.current,
            [e.target.name]: e.target.value,
        }
    }

    const handleOnSubmit = (e,type) => {
       e.preventDefault()
       let userInfo
        if (type === "password")
          userInfo = {password: editRef.current.password, old_password: editRef.current.old_password, user_id: props.currentUser.id}
        else
          userInfo = {[type]: editRef.current[type],user_id: props.currentUser.id}
       props.fetchEditUser(userInfo)  
       editRef.current = {
        new_password: '',
        old_password: '',
        new_email: '',
        email_confirmation: '',
        name: '',
        update_type: ''
       }   
    }

    const emptyObject = () => {
        if (props.message && Object.keys(props.message).length === 0){
            return true
        }else if (props.message){
           return false
        }else{
           return true
        }
    }

    return(
        <div>
            {!emptyObject() && props.message.error_messages? <p className="alert alert-danger" >{props.message.error_messages}</p> : null}
            {!emptyObject() && props.message.saved? <p className="alert alert-success" >{props.message.saved}</p> : null}
            <div className="container h-100  d-flex flex-column justify-content-center align-items-center">
                <h4 >Change your password</h4>
                <form onSubmit={(event) => handleOnSubmit(event,"password")} className="form">
                    <label className="mt-3 form-label">New password</label>
                    <input className="form-control" onChange={handleOnChange} name="password" type="password" />
                    <label className="form-label">Old password</label >
                    <input className="form-control" onChange={handleOnChange } name="old_password" type="password" />
                    <button  className="my-4 btn btn-primary" type="submit">save</button>
                </form>
            </div>

            <div className="container h-100  d-flex flex-column justify-content-center align-items-center">
               <h4>Change your email</h4> 
                <form onSubmit={(event)=>handleOnSubmit(event, "email")} className="form">
                    <label className="mt-3 form-label">New email</label>
                    <input className="form-control" onChange={handleOnChange} name="email" type="email"/>
                    <button  className="my-4 btn btn-primary" type="submit">save</button>
                </form>
            </div>

            <div className="container h-100  d-flex flex-column justify-content-center align-items-center">
            <h4>Change your name</h4>
                <form onSubmit={(event)=>handleOnSubmit(event,"name")} className="form">
                    <label className="mt-3 form-label">Name</label>
                    <input className="form-control" onChange={handleOnChange} name="name" type="text" />
                    <button  className="my-4 btn btn-primary" type="submit">save</button>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = state => { 

  return {
     message:  state.editedMessage.message,
     loading: state.loading
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    fetchEditUser: (action) => dispatch(fetchEditUser(action)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)