import { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../actions/teamActions'
import '../styles/styles.css'


const  Teams = (props) => {
   const teams = useSelector(state => state.teams.teams)
   const dispatch = useDispatch()

   const [league, setLeague] = useState([])
    useEffect(()=>{
      dispatch(fetchTeams())
    },[])

   const onClickHandle = (e) => {
      let  leagueTeams = teams.filter( (team)=>{
           return team.league === e.target.value
      })
      setLeague(leagueTeams)
      
   }

   const renderTeams = ()=>{
       return league.map((team)=>{
           return (    
            <div className="card team-card my-2" key={team.id}>
                <div className="card-header"><img src={team.logo_url} alt='' width="20" height="20"/> </div>
                <div className="card-body"> 
                  <p > {team.fc} </p>  
                </div>
             </div>  
     
           )
       })
   }

    return (
      <div>   
          <select onChange={onClickHandle} className="form-select form-select mx-auto"> 
            <option  value='all'>Select Competition</option>
            <option value='Premier League'>Premier league</option>
            <option value='La Liga'>La Liga Santander</option>
            <option value='Serie A'>Serie A</option>
            <option value='Ligue 1'>Ligue 1</option>
            <option value='Bundesliga'>Bundesliga</option>
          </select> 
        <ul className="d-flex flex-column align-items-center justify-content-center teams">
         {renderTeams()}
        </ul>
      </div>
    );
  
};

export default Teams
