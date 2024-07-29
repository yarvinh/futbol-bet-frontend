import { Link } from "react-router-dom"
import "../../styles/nav-bar.css"
import { useDispatch } from "react-redux"
import { displayElement } from "../../actions/displayElementActions"

const NavBar=({loggedIn})=>{
    const dispatch = useDispatch()

    const handleOnClick = (e)=>{
        if (!e.target.className.includes("display"))
          dispatch(displayElement('profile-inf'))
    }

    return (
        <section onClick={handleOnClick} className="nav-bar-container close">
            <nav className="display nav-bar">
                <ul className="display"> 
                    <li className="nav-bar-links display"><Link to='/games' className="nav-bar-links">Games</Link></li>
                    <li className="nav-bar-links display"><Link to='/teams' className="nav-bar-links">Teams</Link></li>
                    {!loggedIn ? <li className="nav-bar-links display"><Link to='/login' className="nav-bar-links">Log In</Link></li> :  <li className="display"><Link to='/signout' className="nav-bar-links">Sign Out</Link></li>  }
                    {!loggedIn && <li className="nav-bar-links display"><Link to='/signup' className="nav-bar-links">Sign Up</Link> </li>} 
                    {loggedIn && <li className="nav-bar-links display"><Link to='/settings' className="nav-bar-links">Settings</Link></li> } 
                </ul>    
            </nav>
        </section>
    )
}


export default NavBar