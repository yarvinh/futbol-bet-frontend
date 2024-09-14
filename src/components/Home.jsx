import React, { useEffect } from 'react';
import GamesContainer from '../containers/GamesContainer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../actions/gameActions';
import { fetchLeagues } from '../actions/leaguesActions';
import { gameSelector } from '../selectors/gameSelector';
const Home = () => {
  const  dispatch = useDispatch()
  const  games = useSelector(state => gameSelector(state.games.games,state.games.filter))
  const leagues = useSelector(state => state.leagues.leagues)
  useEffect(()=> {
        dispatch(fetchGames())  
        dispatch(fetchLeagues()) 
  },[])

  return (
    <section>
        <GamesContainer games={games} leagues={leagues}/>
    </section>
  )
};



export default Home;