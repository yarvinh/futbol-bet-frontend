import { useState } from "react"
import { OriginalSmileys, POPULAR_EMOJIS } from "../../consts/emojis"

const Emojis = ({handleOnClick}) =>{

    const [isDiplay, setIsDisplay] = useState(false)

    const handleOnAccordion = (e)=>{
        setIsDisplay((pre)=>!pre)
    }

    return(
        <section onClick={handleOnAccordion} >
            <button className="emojis" type="button">
                <img src="/happy.png" className="emojis-img" alt="smyling emoji" ></img>
            </button>
            <div className={!isDiplay ? 'display-none' : 'emojis-wraper'}>
                {OriginalSmileys().map((emoji,index)=>{
                    return <button key={index} onClick={handleOnClick} type="button" className="emojis display" name="reply" value={String.fromCodePoint( emoji )}>{String.fromCodePoint( emoji )}</button> 
                })}
            </div>
        </section>
    )
}

export default Emojis