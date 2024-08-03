import { useRef, useState } from "react";
import { useDispatch} from "react-redux";
import imageCompression from 'browser-image-compression';
import Emojis from "./Emojis";
import './style.css';

const Input = ({submitButton, ids, createAction, name, path})=>{
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState("")
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
        if(e.which === 13 && !submitButton)
          e.preventDefault()
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight)+"px";
        setInputValue(e.target.value,)
    }

    const handleOnKeyUp = (e)=>{
        if (e.code  === 'Enter' && !submitButton){
            dispatch(createAction({
                payload:imagesRef.current,
                [name]: {
                    ...ids,
                    [name]: inputValue
                },
                path: path
            }))
            setInputValue('')
            setImage(null)
            imagesRef.current = []
            e.target.style.height = "1px";  
        }
    }

    const handleOnClick=(e)=>{
        inputValue((pre)=>{
            return `${pre} ${e.target.value}`
        })
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        dispatch(createAction({
            payload:imagesRef.current,
            [name]: {
                ...ids,
                [name]: inputValue
            },
            path: path
        }))
        setImage(null)
        setInputValue('')
    }

    return(
        <div >
            <form className="reply-form" onSubmit={handleOnSubmit} onKeyUp={handleOnKeyUp} >
                {image && <img id="blah" className="comment-and-reply-image" src={image} alt="your image" />}
                <textarea  onKeyPress={handleOnChange} onChange={handleOnChange} rows="1" className="reply-input standar-input" value={inputValue}></textarea> 
                {submitButton && <input className="comment-submit-button" type="submit" value="Submit"/>}
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