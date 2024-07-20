import {useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchLogout } from '../../actions/userAction'
import {Navigate} from 'react-router-dom'

const LogOut = ({user,fetchLogout})=>{
    const handleLogOut = () => {
      user.user && fetchLogout()
    }

    useEffect(() => {
      handleLogOut()
    },[])

    return(
      <div>
          {<Navigate to='/games'/>}     
      </div>
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
    fetchLogout: (action) => dispatch(fetchLogout(action)),
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(LogOut)