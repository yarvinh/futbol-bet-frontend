
import { OriginalSmileys} from "../../consts/emojis"
import { useDispatch, useSelector } from "react-redux"
import { displayEmojisAction } from "../../actions/displayElementActions"
import happyFace from "./photos/happy.png"
import './style.css';

const Emojis = ({handleOnClick}) =>{
    const isDisplay = useSelector(state => state.isDisplay.emojisDisplay)
    const dispatch = useDispatch()

    const handleOnAccordion = (e)=>{
        !isDisplay && dispatch(displayEmojisAction())
    }
    return(
        <section  >
            <button onClick={handleOnAccordion} className="emojis" type="button">
                <img src={happyFace} className="emojis-img" alt="smyling emoji" ></img>
            </button>
            <div className={!isDisplay ? 'display-none' : 'emojis-wraper display'}>
                {OriginalSmileys().map((emoji,index)=>{
                    return <button key={index} onClick={handleOnClick} type="button" className="emojis display" name="reply" value={String.fromCodePoint( emoji )}>{String.fromCodePoint( emoji )}</button> 
                })}
            </div>
        </section>
    )
}

export default Emojis