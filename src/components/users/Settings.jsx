import {useRef } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { fetchEditUser} from '../../actions/settingsActions'
import '../../styles/styles.css'
import ErrorsOrMsg from '../ErrosOrMsg';


const Settings = (props) =>{
    const dipatch = useDispatch()
    const errorsOrMsg = useSelector(state=>state.user.user?.errors_or_messages)
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
          dipatch(fetchEditUser(userInfo))
       editRef.current = {
        new_password: '',
        old_password: '',
        new_email: '',
        email_confirmation: '',
        name: '',
        update_type: ''
       }   
    }

    return(
        <div>
            {errorsOrMsg?.from === "update_user" && 
            <ErrorsOrMsg errors={errorsOrMsg?.errors || errorsOrMsg?.msg} 
            className={errorsOrMsg?.errors ?"alert alert-danger" : "alert alert-success" }/>}
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

export default Settings