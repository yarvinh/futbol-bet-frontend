import { useEffect } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { fetchGames,dispatchSetFilter} from '../actions/gameActions'
import Game from '../components/games/Game'
import {gameSelector} from '../selectors/gameSelector'
import Loading from '../components/Loading';
import ErrorsOrMsg from '../components/ErrosOrMsg';
import { fetchLeagues } from '../actions/leaguesActions';

const GamesContainer = (props)=>{
  const  dispatch = useDispatch()
  const games = useSelector(state => gameSelector(state.games.games,state.games.filter))
  const gamesLoading = useSelector((state => state.games.gamesLoading))
  const leagues = useSelector(state => state.leagues.leagues)
  const errorsOrMsg =  useSelector(state=> state.errorsOrMsg.errorsOrMsg)
  useEffect(()=> {
      dispatch(fetchGames())  
      dispatch(fetchLeagues()) 
  },[])

   const handleOnChange = (e) => {
     dispatch(dispatchSetFilter(e.target.value))
   }

   const renderGames = ()=>{
        return games?.map((game)=>{
            return (      
             <Game teamEvents={game.team_events} fetchCurrentUser={props.fetchCurrentUser} loggedIn={props.loggedIn} key={game.id} currentUser={props.currentUser}  game={game} teamOne={game.teams[0]} teamTwo={game.teams[1]}/>
            )
        })
   }

     return (
       <section className='games-container'>
        {errorsOrMsg.from.includes("game") && <ErrorsOrMsg errors={errorsOrMsg.errors}/>}
        <select onChange={handleOnChange} className="form-select  mx-auto"> 
           <option value='all'>All</option>
           {leagues.map((league)=>{
              return <option key={league.id} value={league.id}>{league.name}</option>
           })}
        </select>
        <div>
          {gamesLoading && <Loading/>}
          {renderGames()} 
        </div>
      </section>
     );
};

export default GamesContainer

