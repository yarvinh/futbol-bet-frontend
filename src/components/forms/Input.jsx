import { useRef, useState } from "react";
import { useDispatch} from "react-redux";
import { useParams } from "react-router";
import { dispatchReply } from "../../actions/replyActions";
import imageCompression from 'browser-image-compression';
import Emojis from "./Emojis";

const Input = ({currentUser, comment_id})=>{
    const {gameId} = useParams()
    const dispatch = useDispatch()
    const [reply, setReply] = useState("")
    const [image, setImage] = useState(null)

    const imagesRef = useRef([])

    const handleOnImg = (e) =>{

        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
       }

        const formData = new FormData(); 
        Array.from(e.target.files).forEach(async (file)=>{   
            const compressedFile = await imageCompression(file, options);      
            formData.append("images[]", compressedFile);  
        })

        imagesRef.current = formData
    }
 
    const handleOnChange = (e)=>{
        if(e.which === 13)
          e.preventDefault()
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight)+"px";
        setReply(e.target.value,)
    }

    const handleOnKeyUp = (e)=>{
        if (e.code  === 'Enter'){
            const payload = {user_id: currentUser.id, comment_id: comment_id, reply: reply }
            dispatch(dispatchReply({payload: imagesRef.current, reply: payload ,gameId: gameId, commentId: comment_id }))
            setReply('')
            setImage(null)
            imagesRef.current = []
            e.target.style.height = "1px";  
        }
    }

    const handleOnClick=(e)=>{
        setReply((pre)=>{
            return `${pre} ${e.target.value}`
        })
    }

    return(
        <div >
            <form className="reply-form" onKeyUp={handleOnKeyUp} >
                {image && <img id="blah" className="comment-and-reply-image" src={image} alt="your image" />}
                <textarea  onKeyPress={handleOnChange} onChange={handleOnChange} rows="1" className="reply-input standar-input" value={reply}></textarea> 
                <div className="text-area-emojis-container">
                    <div className="input-container">
                        <input onChange={handleOnImg} name="images"   multiple className='input-file' type="file" accept="image/png, image/jpeg"/>
                    </div>
                    <Emojis handleOnClick={handleOnClick}/>
                </div>
            </form> 
        </div>
    )
}


export default Input