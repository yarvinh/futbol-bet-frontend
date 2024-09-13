import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  useParams } from "react-router-dom"
import { getTeam } from "../../actions/teamActions"
// import Team from "./Team"
import GamesContainer from "../../containers/GamesContainer"

const TeamDetail = () => {
    const {teamId} = useParams()
    const team = useSelector(state => state.team.team)
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getTeam(teamId))
    },[])
    return (
        <section >
          <div className="team-Wrapper">
          <img src={team.logo_url} alt="Club logo" width="150px"/>
             <h3>{team.fc}</h3>
             <img src="/arena.png" alt="Sport Arena" className="arena"/>
             <h3>{team.stadium}</h3>
          </div>

           <GamesContainer/>
        </section>
    )
}


export default TeamDetail