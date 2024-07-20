import {Link} from 'react-router-dom'
import '../../styles/styles.css'
import DateAndTime from '../DateAndTime';


const Game = ({game,teamOne,teamTwo})=> {
    return (
      <div className="container d-flex justify-content-center">
        <div className="card-container mb-3">
          <div className="card game-card text-center mx-auto my-3" >     
            <div  className="game">
                <div className="card-header">
                  <p> {game.competition} </p>
                </div>
                <div className="status">
                  {game.status === "LIVE" ? <p className='live'> {game.status} </p>: <p> {game.status}</p>}
                </div>
                <Link to={`/games/${game.id}`}>  
                  <div className="card-body">
                      <span >  
                          <img src={teamOne.logo_url} alt='team-logo' width="20" height="20"/> {teamOne.fc} 
                      </span>  
                        <p>VS</p>
                      <span>
                          <img src={teamTwo.logo_url} alt='' width="20" height="20"/> {teamTwo.fc}  
                      </span>
                  </div>
                </Link>
                <div className="card-footer">
                  <DateAndTime date={game.date} time={game.time}/>
              </div>
            </div>
          </div>
          <div >
            <span>{game.bets.length} Bets</span>
          </div>
        </div>
    </div>
  
    );
  
};

export default Game ;