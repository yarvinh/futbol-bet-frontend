
import { useEffect } from 'react';
import CreateBet from './CreateBet';
import { useParams } from 'react-router';
import { getMyBet } from '../../actions/betsActions';
import { useDispatch, useSelector } from 'react-redux';
const Bets = ({game,currentUser}) => {
  const bet = useSelector(state =>state.bet.bet)
  // console.log(bet)
  const {gameId} = useParams()
  const dispatch = useDispatch()

  // const teamOneBetSum = () => {
  // const bets = [...game.bets]
  // let counter = 0
  // bets.forEach((bet) => {
  //     if (bet.team && game[0] && game.teams[0].id.toString() === bet.team_id.toString()){
  //       counter  += bet.amount 
  //     }else{
  //       counter += 0
  //     } 
  //   })
  //   return counter
  // }

  useEffect(()=>{
    dispatch(getMyBet({userId: currentUser.id, gameId: gameId }))
  },[])


  // const betUser = game.bets.find((bet)=>{
  //   return bet.user_id.toString() === currentUser.id?.toString()
  // })

  // const teamTwoBetSum = () => {  
  //   const bets = [...game.bets]
  //   let  counter = 0

  //   bets.forEach((bet) => { 
  //     if (bet?.team && game?.teams[0].id.toString() === bet?.team_id.toString()){
  //       counter += bet.amount    
  //     }else{
  //       counter += 0  
  //     }
  //   });
  //      return counter

  // }

  // const allBetsTotal = () => {
  //   const bets = [...game.bets]
  //     return bets.reduce(function(acc, bet) {
  //       return acc + bet.amount
  //     }, 0);
  // }

  // const tieBetsTotal=()=>{
  //   let  counter = 0
  //   game.bets.forEach((bet) => { 
  //     if (!bet.team){
  //       counter += bet.amount    
  //     }else{
  //       counter += 0  
  //     }
  //   });
  //      return counter
  // }

  // const betExplanation = () => {
  //   let teamOneBetcalcs = allBetsTotal()/teamOneBetSum()
  //   let teamTwoBetcalcs = allBetsTotal()/teamTwoBetSum()
  //   let tieBetsCalc = allBetsTotal()/tieBetsTotal()

  //   if(teamOneBetSum() > 99 && teamTwoBetSum() > 99){
  //     return(
  //       <div>
  //         <p><img src={game.teams[0].logo_url} alt='' width="15" height="15"/>: you get ${Math.floor(teamOneBetcalcs)} for each dollar you bet</p>
  //         <p><img src={game.teams[1].logo_url} alt='' width="15" height="15"/>:you get ${Math.floor(teamTwoBetcalcs)} for each dollar you bet</p>
  //         <p>Tie: you get ${Math.floor(tieBetsCalc)} for each dollar you bet</p>
  //       </div>
  //       )
  //   } else {
  //     return <p>Not enough bets yet</p>
  //   }
  // }

  // // const renderBets = () => {
  //   // if (!bet?.id && game.status !== "LIVE" && game.pending && game.status !== "FINISH"){   
  //     // return (
  //       // <div>
  //         {/* <CreateBet currentUser={currentUser} game={game}/> */}
  //         {/* {betExplanation()} */}
  //       // </div>
        
  //     // )
  //   // } else if (bet?.id){
  //       // return (

  //         // <div className='bet_review'>
  //         //   <p>You bet: ${bet.amount}</p>
  //         //   <span>
  //         //     You Bet For:
  //         //     {bet.team ?<img src={bet.team.logo_url} alt='' width="15" height="15"/>: <span>Tie</span>}
  //         //   </span> 
  //         // </div>
  //       // )   
  //     // }
  //   // }

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