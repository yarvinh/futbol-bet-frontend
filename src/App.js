
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
import GameDetail from './components/GameDetail';
import { fetchGames } from './actions/gameActions';
import NavBar from './components/nav-bar/NavBar';
import NavBarButton from './components/nav-bar/NavButton';

const  App = ()=> {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.loading)
  const user = useSelector(state => state.user.user?.user )
  const loggedIn = useSelector(state =>  state.user.user && state.user.user.logged_in, )
  const [isDiplay, setIsDisplay] = useState(false)

  const handleonclick = (e)=>{
      setIsDisplay((pre)=>!pre)
  }

  const handleOnAcordion = (e)=>{
    if (!e.target.className.includes("display"))
      setIsDisplay(false)
  }

  useEffect(()=>{
    dispatch(fetchCurrentUser())  
    dispatch(fetchGames())
  },[])

  const confirmLoggedIn=()=>{
    dispatch(fetchCurrentUser()) 
    return  loggedIn

  }

  return ( 
    <main id="main">   
        <BrowserRouter >
        <section className={!isDiplay ?'profile-inf': "none"}>
         {loggedIn && !isDiplay && <img src='/IMG_0686-min.jpeg' className="profile-image" alt="profile image"/>}
         {loggedIn && !isDiplay && <strong>{user.name}</strong>}
          <NavBarButton handleonclick={handleonclick} isDiplay={isDiplay}/>
        </section>
        {isDiplay && <NavBar handleOnAcordion={handleOnAcordion} loggedIn={loggedIn}/>}
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

