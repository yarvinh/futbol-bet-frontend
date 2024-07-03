
import CreateBet from './CreateBet';
const Bets = ({game,currentUser}) => {
  
  const teamOneBetSum = () => {
    const bets = [...game.bets]
    let counter = 0
    bets.forEach((bet) => {
      if (bet.team && game[0] && game.teams[0].id.toString() === bet.team_id.toString()){
        counter  += bet.amount 
      }else{
        counter += 0
      } 
    })
    return counter
  }

  const currentUserBet = game.bets.find((bet)=>{
    return bet.user_id.toString() === currentUser.id?.toString()
  })

  const teamTwoBetSum = () => {  
    const bets = [...game.bets]
    let  counter = 0
    bets.forEach((bet) => { 
      if (bet.team && game.team[0].id.toString() === bet.team_id.toString()){
        counter += bet.amount    
      }else{
        counter += 0  
      }
    });
       return counter

  }

  const allBetsTotal = () => {
    const bets = [...game.bets]
      return bets.reduce(function(acc, bet) {
        return acc + bet.amount
      }, 0);
  }

  const tieBetsTotal=()=>{
    const bets = [...game.bets]
    let  counter = 0
    game.bets.forEach((bet) => { 
      if (!bet.team){
        counter += bet.amount    
      }else{
        counter += 0  
      }
    });
       return counter
  }

  const betExplanation = () => {
    let teamOneBetcalcs = allBetsTotal()/teamOneBetSum()
    let teamTwoBetcalcs = allBetsTotal()/teamTwoBetSum()
    let tieBetsCalc = allBetsTotal()/tieBetsTotal()

    if(teamOneBetSum() > 99 && teamTwoBetSum() > 99){
      return(
        <div>
          <p><img src={game.teams[0].logo_url} alt='' width="15" height="15"/>: you get ${Math.floor(teamOneBetcalcs)} for each dollar you bet</p>
          <p><img src={game.teams[1].logo_url} alt='' width="15" height="15"/>:you get ${Math.floor(teamTwoBetcalcs)} for each dollar you bet</p>
          <p>Tie: you get ${Math.floor(tieBetsCalc)} for each dollar you bet</p>
        </div>
        )
    } else {
      return <p>Not enough bets yet</p>
    }
  }

  const renderBets = () => {
    if (!currentUserBet && game.status !== "LIVE" && game.pending && game.status !== "FINISH"){   
      return (
        <div>
          <CreateBet currentUser={currentUser} game={game}/>
          {betExplanation()}
        </div>
        
      )
    } else if (currentUserBet){
      const userSelected = currentUserBet && currentUserBet.team && game.teams.find((t)=>{   
         return  t.id.toString() === currentUserBet.team_id.toString()  
      })
        return (
          <div className='bet_review'>
            <p>You bet: ${currentUserBet.amount}</p>
            <span>
              You Bet For:
              {currentUserBet.team ?<img src={userSelected.logo_url} alt='' width="15" height="15"/>: <span>Tie</span>}
            </span> 
          </div>
          )   
      }

  }

    return (
      <div>
           {renderBets()}
      </div>
    );
};


export default Bets