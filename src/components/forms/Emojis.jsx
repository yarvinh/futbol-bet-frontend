import { POPULAR_EMOJIS } from "../../consts/emojis"

const Emojis = ({handleOnClick}) =>{
    '&#128557;'
    const emoji = String.fromCharCode('&#128557;')
    return(
        <div className="emojis-wraper">
            {POPULAR_EMOJIS.map((emoji,index)=>{
                return <button key={index} onClick={handleOnClick} type="button" className="emojis" name="reply" value={String.fromCodePoint( emoji )}>{String.fromCodePoint( emoji )}</button> 
            })}
        </div>
    )
}

export default Emojis