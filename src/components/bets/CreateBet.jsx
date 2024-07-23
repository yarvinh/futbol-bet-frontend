import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { dispatchBets } from "../../actions/betsActions"
import { useRef } from "react"
import ErrorsOrMsg from "../../state/errorsOrMsgs"

const CreateBet = ({game,currentUser})=>{
    const errorsOrMsg = useSelector(state => state.errorsOrMsg.errorsOrMsg)
    const dispatch = useDispatch()
    const {gameId} = useParams()
    const setBetRef = useRef({
        team_id: '',
        game_id: gameId,
        user_id: currentUser.id,
        amount: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(dispatchBets(setBetRef.current))
    }
    
    const handleAmountChange = (e) => {
        setBetRef.current = {
          ...setBetRef.current,
          amount: e.target.value
        }
    }
      
    const handleTeamChange = (e) => {
        setBetRef.current = {
            ...setBetRef.current,
            team_id: e.target.value.toString(),
        }
    }
    // console.log(errorsOrMsg.from, errorsOrMsg.errors)
    return (
        <div className='bet_form p-3'>   
            <form onSubmit={handleSubmit}> 
                <label className="form-label"> Bets </label> 
                <select className="form-select mx-auto mb-3" onChange={handleTeamChange}>
                    <option value=''>Bet Obtions</option>
                    <option value='tie'>Tie</option>
                    <option value={game.teams[0].id}>{game.teams[0].fc}</option>
                    <option value={game.teams[1].id}>{game.teams[1].fc}</option>
                </select>
                <input className="form-control" type="hidden" name="action"  />
                <label className="form-label"> Enter amount </label>
                <input className="form-control" onChange={handleAmountChange} type='number'  />
                <button type="submit" className="btn btn-primary btn-default my-3">Submit bet</button>
            </form>
            {errorsOrMsg.from === 'create_bet' && <ErrorsOrMsg errors={errorsOrMsg.errors}/>}
        </div>
    )
}


export default CreateBet