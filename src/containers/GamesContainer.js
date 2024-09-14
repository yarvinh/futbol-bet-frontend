
import { useDispatch,useSelector} from 'react-redux';
import { dispatchSetFilter} from '../actions/gameActions'
import Game from '../components/games/Game'
import Loading from '../components/Loading';
import ErrorsOrMsg from '../components/ErrosOrMsg';

const GamesContainer = (props)=>{
  const {games, leagues} = props
  const  dispatch = useDispatch()
  const gamesLoading = useSelector((state => state.games.gamesLoading))
  const errorsOrMsg =  useSelector(state=> state.errorsOrMsg.errorsOrMsg)
   const handleOnChange = (e) => {
     dispatch(dispatchSetFilter(e.target.value))
   }

    const renderGames = ()=>{
          return games?.map((game)=>{
              return (      
              <Game key={game.id} teamEvents={game.team_events} fetchCurrentUser={props.fetchCurrentUser} loggedIn={props.loggedIn} currentUser={props.currentUser} game={game} />
              )
          })
    }

    return (
      <section className='games-container'>
      {errorsOrMsg.from.includes("game") && <ErrorsOrMsg errors={errorsOrMsg.errors}/>}
      {leagues && <select onChange={handleOnChange} className="form-select  mx-auto"> 
          <option value='all'>All</option>
          {leagues.map((league)=>{
            return <option key={league.id} value={league.id}>{league.name}</option>
          })}
      </select>}
      <div>
        {gamesLoading && <Loading/>}
        {renderGames()} 
      </div>
    </section>
    );
};

export default GamesContainer

