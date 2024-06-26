import { useEffect } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { fetchGames,dispatchSetFilter} from '../actions/gameActions'
import Game from '../components/games/Game'
import {gameSelector} from '../selectors/gameSelector'

const GamesContainer = (props)=>{
  const  dispatch = useDispatch()
  const games = useSelector(state=> gameSelector(state.games.games,state.games.filter))

  useEffect(()=> {
      dispatch(fetchGames())   
  },[])

   const onClickHandle = (e) => {
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
        <select onChange={onClickHandle} className="form-select  mx-auto"> 
           <option value='all'>All</option>
           <option value='Champion League'>UEFA Champion league</option>
           <option value='Premier League'>Premier league</option>
           <option value='La Liga'>La Liga Santander</option>
           <option value='Serie A'>Serie A</option>
           <option value='Ligue 1'>Ligue 1</option>
           <option value='Bundesliga'>Bundesliga</option>
        </select>
        <div>
          {renderGames()} 
        </div>
      </section>
     );
};

export default GamesContainer

