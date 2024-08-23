
import { useEffect } from 'react';
import CreateBet from './CreateBet';
import { useParams } from 'react-router';
import { getMyBet } from '../../actions/betsActions';
import { useDispatch, useSelector } from 'react-redux';
const Bets = ({game,currentUser}) => {
  const bet = useSelector(state =>state.bet.bet)
  const {gameId} = useParams()
  const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(getMyBet({userId: currentUser.id, gameId: gameId }))
    },[])

    return (
      <section>
        {!bet?.id && game.status !== "LIVE" && game.status !== "FINISH" && <CreateBet currentUser={currentUser} game={game}/>}
        {bet.id && <div className='bet_review'>
          <p>You bet: ${bet.amount}</p>
          <span>
            You Bet For:
            {bet.team ?<img src={bet.team.logo_url} alt='' width="15" height="15"/>: <span>Tie</span>}
          </span> 
        </div>}
      </section>
    );
};


export default Bets