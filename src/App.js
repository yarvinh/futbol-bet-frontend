import {useSelector, useDispatch } from 'react-redux';
import {useEffect, useState } from 'react';
import './App.css';
import Teams from './components/Teams'
import GamesContainer from './containers/GamesContainer'
import UsersContainer from './containers/UsersContainer'
import Login from './components/users/Login'
import { fetchCurrentUser} from './actions/userAction'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LogOut from './components/users/LogOut'
import './styles/styles.css'
import Settings from './components/users/Settings';
import GameDetail from './components/games/GameDetail';
import NavBar from './components/nav-bar/NavBar';
import NavBarButton from './components/nav-bar/NavButton';
import ErrorsOrMsg from './components/ErrosOrMsg';
import { tokenExist } from './helpers/token';
import Loading from './components/Loading';
import { displayElement } from './actions/displayElementActions';

const  App = ()=> {
  const dispatch = useDispatch()
  const userLoading = useSelector(state => state.user.userLoading)
  const errorsOrMsg = useSelector(state => state.errorsOrMsg.errorsOrMsg)
  const user = useSelector(state => state.user.user?.user )
  const loggedIn = useSelector(state =>  state.user.user && state.user.user.logged_in, )
  const isDisplay = useSelector(state=> state.isDisplay)

  console.log(isDisplay)
  useEffect(()=>{
    tokenExist() && dispatch(fetchCurrentUser())  
  },[])

  const confirmLoggedIn=()=>{
    dispatch(fetchCurrentUser()) 
    return  loggedIn
  }

  return ( 
    <main id="main">   
      <BrowserRouter >
        <section className={isDisplay.className}>
          {loggedIn && !isDisplay.isDisplay && <img src='/IMG_0686-min.jpeg' className="profile-image" alt="profile image"/>}
          {loggedIn && !isDisplay.isDisplay && <strong>{user.name}</strong>}
          <NavBarButton/>
        </section>
        {userLoading && <Loading/>}
        {isDisplay.isDisplay && <NavBar  loggedIn={loggedIn}/>}
        {errorsOrMsg.from === "from_server" && <ErrorsOrMsg errors={errorsOrMsg?.errors || errorsOrMsg?.msg} />}
        <div className="App content-container">
          <Routes>
            <Route exact path='/settings' element ={<Settings currentUser={user} loggedIn={loggedIn} />}/>
            <Route exact path='/games/:gameId' element ={<GameDetail />}/>
            <Route exact path='/signout' element={<LogOut/>}/>
            <Route exact path='/login' element={<Login  confirmLoggedIn={confirmLoggedIn}/>}>
            </Route>
            <Route exact path='/signup'element={<UsersContainer />}/>
            <Route exact path='/games' element={<GamesContainer/>}/>
            <Route exact path='/teams' element={<Teams/>}/>
          </Routes>
        </div> 
      </BrowserRouter>
      <div className="empty-splace"></div>
    </main>

  )
}

export default App

