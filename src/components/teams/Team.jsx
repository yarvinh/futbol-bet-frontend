import { Link } from "react-router-dom"

const Team = ({team}) => {
  return (  
    <li className="card team-card my-2" key={team.id}>
        <div className="card-header"><img src={team.logo_url} alt='' width="20" height="20"/> </div>
        <div className="card-body"> 
          <Link to={`/teams/${team.id}`} >{team.fc}</Link>
        </div>
    </li>  
  )
}

export default Team