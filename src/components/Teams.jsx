// import { useEffect} from 'react';
// import {  useDispatch, useSelector } from 'react-redux';
// import { fetchTeams } from '../actions/teamActions'
// import '../styles/styles.css'
// import { fetchLeagues } from '../actions/leaguesActions';


// const  Teams = () => {
//    const teams = useSelector(state => state.teams.teams)
//    const dispatch = useDispatch()
//    const leagues = useSelector(state => state.leagues.leagues)
   
//     useEffect(()=>{
//       if (leagues.length < 1)
//         dispatch(fetchLeagues())
//     },[])

//    const onClickHandle = (e) => {
//       if(e.target.value !== "no-competition")
//       dispatch(fetchTeams(e.target.value))
//    }

//    const renderTeams = ()=>{
//        return teams.map((team)=>{
//            return (    
//             <div className="card team-card my-2" key={team.id}>
//                 <div className="card-header"><img src={team.logo_url} alt='' width="20" height="20"/> </div>
//                 <div className="card-body"> 
//                   <p > {team.fc} </p>  
//                 </div>
//              </div>  
     
//            )
//        })
//    }

//     return (
//       <div>   
//           <select onChange={onClickHandle} className="form-select form-select mx-auto"> 
//             <option  value='no-competition'>Select Competition</option>
//             <option  value='all'>All teams</option>
//             {leagues.map((league)=>{
//               return <option key={league.id} value={league.id}> {league.name}</option>
//             })}
//           </select> 
//         <ul className="d-flex flex-column align-items-center justify-content-center teams">
//          {renderTeams()}
//         </ul>
//       </div>
//     );
  
// };

// export default Teams
