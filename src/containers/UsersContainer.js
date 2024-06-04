import { connect } from 'react-redux';
import { createUser } from '../actions/createUsersActions'
import CreateUser from '../components/users/CreateUser'
import {Navigate} from 'react-router-dom'

const UsersContainer = ({user}) =>{

    return (
      <div>
         {user.user?.logged_in? <Navigate to='/games'/>: <CreateUser/>}  
      </div>
    );
}




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
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
