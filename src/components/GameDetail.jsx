import { Link, useParams } from "react-router-dom"
import {useDispatch, useSelector } from "react-redux"
import Bets from "./bets/Bets"
import Likes from "./games/Likes"
import CommentsContainer from "../containers/CommentsContainer"
import DateAndTime from "./DateAndTime"
import { useEffect } from "react"
import { fetchGame } from "../actions/gameActions"
import { gameLikesReceived } from "../state/gameDetailReducers"

const GameDetail=()=>{
    
    const dispatch = useDispatch()
    const {gameId} = useParams()
    const loading = useSelector(state =>  state.loading)
    const user = useSelector(state => state.user.user)
    const game = useSelector(state => state.game.game)
    const {logged_in} = user
    useEffect(()=>{
       dispatch(fetchGame(gameId))
    },[])

    return (
        <section>
            <div className="container d-flex justify-content-center game">
                <div className="card-container mb-3">
                    <div className="card game-card text-center mx-auto my-3" >     
                    <div  className="game">
                        <div className="card-header">
                            <h3> {game?.competition} </h3>
                        </div>
                        <div className="status">
                            {game?.status === "LIVE" ? <p className='live'> {game?.status} </p> : <p> {game?.status}</p>}
                        </div>
                        <Link to={`/games/${game?.id}`}>  
                            <div className="card-body">
                                {game.teams?.map((team)=>{
                                    return(
                                        <div key={team.id}>
                                          <img src={team.logo_url} alt='team-logo' width="20" height="20"/> 
                                          <p><strong>{team?.fc} </strong></p>
                                        </div>   
                                    )
                                })}
                            </div>
                        </Link>
                        <div className="card-footer">
                            {game.date && <DateAndTime date={game.date} time={game.time}/>}
                        </div>
                    </div>
                    </div>
                    <div className="likes-section bg-light mx-auto my-2 py-2">
                        {logged_in && game.likes && <Likes likeType={'game'} likes={game.likes} gameCommentOrReply={game} likesReceived={gameLikesReceived} user_id={user.user.id} game_id={game?.id}/>}
                    </div>
                    <p>{game.bets?.length} Bets</p>
                    <div className="bets-section bg-light mx-auto my-4 py-2">
                      {logged_in && game.teams &&  <Bets currentUser={user.user} game={game} bets={game.bets}/>}
                    </div>  
                </div>
            </div>
                {game.id && <CommentsContainer comments={game.comments_by_date} game={game} currentUser={user.user}  loggedIn={user.logged_in} />}
        </section>
        
    );
}


export default GameDetail
   

